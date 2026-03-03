import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatCurrency, getImageUrl } from '../utils/helpers';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-cream pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <FiShoppingBag className="text-8xl text-darkBrown/30 mx-auto mb-6" />
                    </motion.div>
                    <h2 className="text-3xl font-serif font-bold text-darkBrown mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-darkBrown/70 mb-8">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link to="/shop">
                        <motion.button
                            className="px-8 py-3 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors btn-ripple"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Continue Shopping
                        </motion.button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-darkBrown/70">{cartItems.length} items</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item._id}
                                    className="bg-white rounded-2xl p-6 shadow-md"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="flex gap-6">
                                        {/* Image */}
                                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={getImageUrl(item.images?.[0])}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <Link to={`/product/${item._id}`}>
                                                <h3 className="text-lg font-serif font-bold text-darkBrown mb-1 hover:text-gold transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-darkBrown/60 mb-3">{item.category}</p>
                                            <div className="text-xl font-bold text-darkBrown">
                                                {formatCurrency(item.price)}
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <FiTrash2 size={20} />
                                            </button>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full bg-beige hover:bg-gold hover:text-white transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-bold text-darkBrown w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full bg-beige hover:bg-gold hover:text-white transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="text-lg font-bold text-darkBrown">
                                                {formatCurrency(item.price * item.quantity)}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Clear Cart */}
                        <motion.button
                            onClick={clearCart}
                            className="mt-6 text-red-500 hover:text-red-700 font-medium"
                            whileHover={{ x: 5 }}
                        >
                            Clear Cart
                        </motion.button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-2xl font-serif font-bold text-darkBrown mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-darkBrown/70">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(getCartTotal())}</span>
                                </div>
                                <div className="flex justify-between text-darkBrown/70">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="border-t border-darkBrown/20 pt-4 flex justify-between text-xl font-bold text-darkBrown">
                                    <span>Total</span>
                                    <span>{formatCurrency(getCartTotal())}</span>
                                </div>
                            </div>

                            <Link to="/checkout">
                                <motion.button
                                    className="w-full px-8 py-4 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors btn-ripple mb-3"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </Link>

                            <Link to="/shop">
                                <button className="w-full px-8 py-3 bg-white border-2 border-gold text-darkBrown rounded-full font-medium hover:bg-blush/20 transition-colors">
                                    Continue Shopping
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
