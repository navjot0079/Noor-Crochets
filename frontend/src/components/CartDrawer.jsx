import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getCartCount,
        clearCart,
    } = useCart();

    // Backdrop animation
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    // Drawer animation
    const drawerVariants = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 200,
            }
        },
        exit: {
            x: '100%',
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 200,
            }
        },
    };

    // Cart item animation
    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05 },
        }),
        exit: { opacity: 0, x: -20 },
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-beige">
                            <div className="flex items-center gap-3">
                                <FiShoppingBag className="text-gold" size={24} />
                                <h2 className="text-xl font-serif font-bold text-darkBrown">
                                    Your Cart
                                </h2>
                                {getCartCount() > 0 && (
                                    <span className="bg-gold text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
                                        {getCartCount()}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 rounded-full hover:bg-beige/50 transition-colors"
                            >
                                <FiX size={24} className="text-darkBrown" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-5">
                            {cartItems.length === 0 ? (
                                <motion.div
                                    className="flex flex-col items-center justify-center h-full text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="w-24 h-24 bg-beige/50 rounded-full flex items-center justify-center mb-6">
                                        <FiShoppingBag size={40} className="text-gold/50" />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-darkBrown mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-darkBrown/60 mb-6">
                                        Discover our handcrafted crochet collection
                                    </p>
                                    <Link
                                        to="/shop"
                                        onClick={closeCart}
                                        className="px-6 py-3 bg-gold text-white rounded-xl font-medium hover:bg-darkBrown transition-colors flex items-center gap-2"
                                    >
                                        Start Shopping
                                        <FiArrowRight />
                                    </Link>
                                </motion.div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {cartItems.map((item, index) => (
                                            <motion.div
                                                key={item.cartItemId}
                                                variants={itemVariants}
                                                custom={index}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                layout
                                                className="flex gap-4 p-4 bg-cream/50 rounded-xl border border-beige/50"
                                            >
                                                {/* Product Image */}
                                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-beige flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-serif font-bold text-darkBrown truncate">
                                                        {item.name}
                                                    </h4>
                                                    <div className="flex gap-2 mt-1 mb-2">
                                                        <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                                                            {item.size}
                                                        </span>
                                                        <span className="text-xs bg-sage/30 text-darkBrown px-2 py-0.5 rounded-full">
                                                            {item.yarnType}
                                                        </span>
                                                    </div>
                                                    <p className="text-lg font-bold text-gold">
                                                        {formatCurrency(item.price)}
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex flex-col items-end justify-between">
                                                    <button
                                                        onClick={() => removeFromCart(item.cartItemId)}
                                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </button>

                                                    <div className="flex items-center gap-2 bg-white rounded-lg border border-beige">
                                                        <button
                                                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                            className="p-1.5 hover:bg-beige/50 rounded-l-lg transition-colors"
                                                        >
                                                            <FiMinus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-darkBrown">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                            className="p-1.5 hover:bg-beige/50 rounded-r-lg transition-colors"
                                                        >
                                                            <FiPlus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Clear Cart */}
                                    {cartItems.length > 0 && (
                                        <button
                                            onClick={clearCart}
                                            className="w-full text-center text-sm text-red-500 hover:text-red-600 py-2 transition-colors"
                                        >
                                            Clear entire cart
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer - Summary & Checkout */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-beige p-5 bg-cream/30">
                                {/* Summary */}
                                <div className="space-y-3 mb-5">
                                    <div className="flex justify-between text-darkBrown/70">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(getCartTotal())}</span>
                                    </div>
                                    <div className="flex justify-between text-darkBrown/70">
                                        <span>Shipping</span>
                                        <span className="text-sage font-medium">Free</span>
                                    </div>
                                    <div className="border-t border-beige pt-3 flex justify-between text-lg font-bold text-darkBrown">
                                        <span>Total</span>
                                        <span className="text-gold">{formatCurrency(getCartTotal())}</span>
                                    </div>
                                </div>

                                {/* Checkout Buttons */}
                                <div className="space-y-3">
                                    <Link
                                        to="/checkout"
                                        onClick={closeCart}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-gold text-white rounded-xl font-bold text-lg hover:bg-darkBrown transition-colors shadow-lg shadow-gold/25"
                                    >
                                        Proceed to Checkout
                                        <FiArrowRight />
                                    </Link>
                                    <button
                                        onClick={closeCart}
                                        className="w-full py-3 bg-transparent text-darkBrown border border-beige rounded-xl font-medium hover:bg-beige/30 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-darkBrown/50">
                                    <span>🔒 Secure Checkout</span>
                                    <span>✨ Handmade Quality</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
