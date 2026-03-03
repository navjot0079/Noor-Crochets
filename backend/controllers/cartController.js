import Cart from '../models/Cart.js';

// @desc    Get customer cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ customerId: req.user._id });

        if (!cart) {
            // Create empty cart if doesn't exist
            cart = await Cart.create({
                customerId: req.user._id,
                items: [],
            });
        }

        res.json({
            items: cart.items,
            total: cart.getTotal(),
            itemCount: cart.getItemCount(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { productId, name, image, category, basePrice, size, yarnType, quantity } = req.body;

        // Validate required fields
        if (!productId || !name || !basePrice) {
            return res.status(400).json({ message: 'Product ID, name, and base price are required' });
        }

        const selectedSize = size || 'Medium';
        const selectedYarn = yarnType || 'Cotton';
        const qty = quantity || 1;

        // Calculate price based on size and yarn type
        const calculatedPrice = Cart.calculatePrice(basePrice, selectedSize, selectedYarn);

        // Generate unique cart item identifier
        const cartItemId = Cart.generateCartItemId(productId, selectedSize, selectedYarn);

        let cart = await Cart.findOne({ customerId: req.user._id });

        if (!cart) {
            // Create new cart
            cart = new Cart({
                customerId: req.user._id,
                items: [],
            });
        }

        // Check if item with same product, size, and yarn type exists
        const existingItemIndex = cart.items.findIndex(
            (item) =>
                item.productId === productId &&
                item.size === selectedSize &&
                item.yarnType === selectedYarn
        );

        if (existingItemIndex > -1) {
            // Update quantity of existing item
            cart.items[existingItemIndex].quantity += qty;
        } else {
            // Add new item
            cart.items.push({
                productId,
                name,
                image: image || '',
                category: category || 'Uncategorized',
                basePrice,
                size: selectedSize,
                yarnType: selectedYarn,
                price: calculatedPrice,
                quantity: qty,
            });
        }

        cart.lastUpdated = Date.now();
        await cart.save();

        res.json({
            message: 'Item added to cart',
            items: cart.items,
            total: cart.getTotal(),
            itemCount: cart.getItemCount(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = async (req, res) => {
    try {
        const { productId, size, yarnType, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }

        const cart = await Cart.findOne({ customerId: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId === productId &&
                item.size === (size || item.size) &&
                item.yarnType === (yarnType || item.yarnType)
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        cart.lastUpdated = Date.now();
        await cart.save();

        res.json({
            message: 'Cart updated',
            items: cart.items,
            total: cart.getTotal(),
            itemCount: cart.getItemCount(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private
export const removeFromCart = async (req, res) => {
    try {
        const { productId, size, yarnType } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const cart = await Cart.findOne({ customerId: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(
            (item) =>
                !(
                    item.productId === productId &&
                    item.size === size &&
                    item.yarnType === yarnType
                )
        );

        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.lastUpdated = Date.now();
        await cart.save();

        res.json({
            message: 'Item removed from cart',
            items: cart.items,
            total: cart.getTotal(),
            itemCount: cart.getItemCount(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ customerId: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        cart.lastUpdated = Date.now();
        await cart.save();

        res.json({
            message: 'Cart cleared',
            items: [],
            total: 0,
            itemCount: 0,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Sync local cart with server cart (for logged-in users)
// @route   POST /api/cart/sync
// @access  Private
export const syncCart = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Items array is required' });
        }

        let cart = await Cart.findOne({ customerId: req.user._id });

        if (!cart) {
            cart = new Cart({
                customerId: req.user._id,
                items: [],
            });
        }

        // Merge local items with server cart
        for (const localItem of items) {
            const existingIndex = cart.items.findIndex(
                (item) =>
                    item.productId === localItem.productId &&
                    item.size === localItem.size &&
                    item.yarnType === localItem.yarnType
            );

            if (existingIndex > -1) {
                // Update quantity (add local quantity to server quantity)
                cart.items[existingIndex].quantity += localItem.quantity;
            } else {
                // Add new item with calculated price
                const calculatedPrice = Cart.calculatePrice(
                    localItem.basePrice,
                    localItem.size,
                    localItem.yarnType
                );

                cart.items.push({
                    productId: localItem.productId || localItem.id,
                    name: localItem.name,
                    image: localItem.image || '',
                    category: localItem.category || 'Uncategorized',
                    basePrice: localItem.basePrice,
                    size: localItem.size || 'Medium',
                    yarnType: localItem.yarnType || 'Cotton',
                    price: calculatedPrice,
                    quantity: localItem.quantity || 1,
                });
            }
        }

        cart.lastUpdated = Date.now();
        await cart.save();

        res.json({
            message: 'Cart synced successfully',
            items: cart.items,
            total: cart.getTotal(),
            itemCount: cart.getItemCount(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
