import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { cartAPI } from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

// Pricing multipliers
export const SIZE_MULTIPLIERS = {
    Small: 1,
    Medium: 1.3,
    Large: 1.6,
};

export const YARN_MULTIPLIERS = {
    Cotton: 1,
    Wool: 1.2,
    'Premium Blend': 1.5,
};

// Calculate price based on base price, size, and yarn type
export const calculatePrice = (basePrice, size, yarnType) => {
    const sizeMultiplier = SIZE_MULTIPLIERS[size] || 1;
    const yarnMultiplier = YARN_MULTIPLIERS[yarnType] || 1;
    return Math.round(basePrice * sizeMultiplier * yarnMultiplier * 100) / 100;
};

// Check if user is logged in
const isUserLoggedIn = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) return false;
    try {
        const user = JSON.parse(userInfo);
        return !!user?.token;
    } catch {
        return false;
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSynced, setIsSynced] = useState(false);

    // Load cart on mount
    useEffect(() => {
        loadCart();
    }, []);

    // Save cart to localStorage for guests
    useEffect(() => {
        if (!isUserLoggedIn()) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Load cart from localStorage or server
    const loadCart = useCallback(async () => {
        if (isUserLoggedIn()) {
            try {
                setIsLoading(true);
                const { data } = await cartAPI.get();
                const formattedItems = data.items.map((item) => ({
                    ...item,
                    cartItemId: `${item.productId}-${item.size}-${item.yarnType}`,
                    id: item.productId,
                }));
                setCartItems(formattedItems);
                setIsSynced(true);
            } catch (error) {
                console.error('Failed to load cart from server:', error);
                // Fallback to localStorage
                const savedCart = localStorage.getItem('cartItems');
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            // Load from localStorage for guests
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch {
                    setCartItems([]);
                }
            }
        }
    }, []);

    // Sync local cart with server when user logs in
    const syncCartWithServer = useCallback(async () => {
        if (!isUserLoggedIn()) return;

        const localCart = localStorage.getItem('cartItems');
        if (localCart) {
            try {
                const items = JSON.parse(localCart);
                if (items.length > 0) {
                    // Format items for sync
                    const syncItems = items.map((item) => ({
                        productId: item.id || item.productId,
                        name: item.name,
                        image: item.image,
                        category: item.category,
                        basePrice: item.basePrice,
                        size: item.size,
                        yarnType: item.yarnType,
                        quantity: item.quantity,
                    }));

                    await cartAPI.sync(syncItems);
                    // Clear local cart after syncing
                    localStorage.removeItem('cartItems');
                }
            } catch (error) {
                console.error('Failed to sync cart:', error);
            }
        }
        // Reload cart from server
        await loadCart();
    }, [loadCart]);

    // Generate unique cart item ID based on product, size, and yarn type
    const generateCartItemId = (product, size, yarnType) => {
        return `${product.id || product.productId || product._id}-${size}-${yarnType}`;
    };

    const addToCart = async (product, quantity = 1, size = 'Medium', yarnType = 'Cotton') => {
        const cartItemId = generateCartItemId(product, size, yarnType);
        const calculatedPrice = calculatePrice(product.basePrice || product.price, size, yarnType);

        if (isUserLoggedIn()) {
            try {
                const { data } = await cartAPI.add({
                    productId: product.id || product.productId || product._id,
                    name: product.name,
                    image: product.image,
                    category: product.category,
                    basePrice: product.basePrice || product.price,
                    size,
                    yarnType,
                    quantity,
                });

                const formattedItems = data.items.map((item) => ({
                    ...item,
                    cartItemId: `${item.productId}-${item.size}-${item.yarnType}`,
                    id: item.productId,
                }));
                setCartItems(formattedItems);
                toast.success('Added to cart!');
            } catch (error) {
                console.error('Failed to add to cart:', error);
                toast.error('Failed to add to cart');
            }
        } else {
            // Guest user - use local storage
            const existingItem = cartItems.find((item) => item.cartItemId === cartItemId);

            if (existingItem) {
                setCartItems(
                    cartItems.map((item) =>
                        item.cartItemId === cartItemId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                );
                toast.success('Updated cart quantity');
            } else {
                const cartItem = {
                    ...product,
                    productId: product.id || product.productId || product._id,
                    cartItemId,
                    size,
                    yarnType,
                    price: calculatedPrice,
                    quantity,
                };
                setCartItems([...cartItems, cartItem]);
                toast.success('Added to cart!');
            }
        }

        // Open cart drawer when item is added
        setIsCartOpen(true);
    };

    const removeFromCart = async (cartItemId) => {
        const item = cartItems.find((i) => i.cartItemId === cartItemId);
        if (!item) return;

        if (isUserLoggedIn()) {
            try {
                const { data } = await cartAPI.remove({
                    productId: item.productId || item.id,
                    size: item.size,
                    yarnType: item.yarnType,
                });

                const formattedItems = data.items.map((i) => ({
                    ...i,
                    cartItemId: `${i.productId}-${i.size}-${i.yarnType}`,
                    id: i.productId,
                }));
                setCartItems(formattedItems);
                toast.success('Removed from cart');
            } catch (error) {
                console.error('Failed to remove from cart:', error);
                toast.error('Failed to remove from cart');
            }
        } else {
            setCartItems(cartItems.filter((i) => i.cartItemId !== cartItemId));
            toast.success('Removed from cart');
        }
    };

    const updateQuantity = async (cartItemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }

        const item = cartItems.find((i) => i.cartItemId === cartItemId);
        if (!item) return;

        if (isUserLoggedIn()) {
            try {
                const { data } = await cartAPI.update({
                    productId: item.productId || item.id,
                    size: item.size,
                    yarnType: item.yarnType,
                    quantity,
                });

                const formattedItems = data.items.map((i) => ({
                    ...i,
                    cartItemId: `${i.productId}-${i.size}-${i.yarnType}`,
                    id: i.productId,
                }));
                setCartItems(formattedItems);
            } catch (error) {
                console.error('Failed to update cart:', error);
                toast.error('Failed to update quantity');
            }
        } else {
            setCartItems(
                cartItems.map((i) =>
                    i.cartItemId === cartItemId ? { ...i, quantity } : i
                )
            );
        }
    };

    const clearCart = async () => {
        if (isUserLoggedIn()) {
            try {
                await cartAPI.clear();
                setCartItems([]);
                toast.success('Cart cleared');
            } catch (error) {
                console.error('Failed to clear cart:', error);
                toast.error('Failed to clear cart');
            }
        } else {
            setCartItems([]);
            localStorage.removeItem('cartItems');
            toast.success('Cart cleared');
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartSubtotal = () => {
        return getCartTotal();
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const value = {
        cartItems,
        isLoading,
        isSynced,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartSubtotal,
        getCartCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        loadCart,
        syncCartWithServer,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
