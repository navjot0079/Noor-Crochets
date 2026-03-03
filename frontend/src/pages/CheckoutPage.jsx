import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiShoppingBag, FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiLogIn } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';
import { orderAPI } from '../utils/api';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            toast.error('Please login to checkout');
            navigate('/login', { state: { from: '/checkout' } });
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        notes: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }

        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'ZIP code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Require login
        if (!user) {
            toast.error('Please login to checkout');
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }

        setIsSubmitting(true);

        try {
            const shippingAddress = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                notes: formData.notes,
            };

            // Use the cart-based order creation for logged-in users
            const response = await orderAPI.create({ shippingAddress });

            // Set order number from response
            setOrderNumber(response.data.order.orderNumber);

            // Clear cart and show success
            clearCart();
            setOrderPlaced(true);
            toast.success('Order placed successfully!');
        } catch (error) {
            console.error('Order creation failed:', error);
            const message = error.response?.data?.message || 'Failed to place order. Please try again.';
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // If cart is empty and order not placed, redirect to shop
    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-beige/30 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-lg mx-auto text-center py-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-24 h-24 bg-beige/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShoppingBag size={40} className="text-gold/50" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-darkBrown mb-4">
                            Your cart is empty
                        </h2>
                        <p className="text-darkBrown/60 mb-6">
                            Add some handcrafted items to your cart before checkout
                        </p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl font-medium hover:bg-darkBrown transition-colors"
                        >
                            Browse Products
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Order success view
    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-beige/30 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-lg mx-auto text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="w-24 h-24 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            <FiCheck size={48} className="text-sage" />
                        </motion.div>

                        <motion.h1
                            className="text-3xl md:text-4xl font-serif font-bold text-darkBrown mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Order Placed Successfully!
                        </motion.h1>

                        <motion.p
                            className="text-darkBrown/70 text-lg mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Thank you for your order. We'll start crafting your items with love!
                        </motion.p>

                        <motion.div
                            className="bg-white rounded-2xl p-6 shadow-lg mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-sm text-darkBrown/60 mb-2">Order Number</p>
                            <p className="text-2xl font-mono font-bold text-gold">{orderNumber}</p>
                            <div className="mt-4 pt-4 border-t border-beige">
                                <p className="text-sm text-darkBrown/60">
                                    A confirmation email has been sent to{' '}
                                    <span className="font-medium text-darkBrown">{formData.email}</span>
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                to="/shop"
                                className="px-6 py-3 bg-gold text-white rounded-xl font-medium hover:bg-darkBrown transition-colors"
                            >
                                Continue Shopping
                            </Link>
                            <Link
                                to="/"
                                className="px-6 py-3 border border-beige rounded-xl font-medium hover:bg-beige/30 transition-colors"
                            >
                                Back to Home
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-beige/30 pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-darkBrown/70 hover:text-gold transition-colors"
                    >
                        <FiArrowLeft />
                        Back to Cart
                    </button>
                </motion.div>

                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-darkBrown mb-4">
                        Checkout
                    </h1>
                    <p className="text-darkBrown/70">Complete your order and we'll start crafting!</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Order Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Contact Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h2 className="text-xl font-serif font-bold text-darkBrown mb-6 flex items-center gap-2">
                                    <FiUser className="text-gold" />
                                    Contact Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-darkBrown mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 bg-cream/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all ${errors.fullName ? 'border-red-400' : 'border-beige focus:border-gold'
                                                }`}
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-darkBrown mb-2">
                                            <FiMail className="inline mr-2" />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className={`w-full px-4 py-3 bg-cream/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all ${errors.email ? 'border-red-400' : 'border-beige focus:border-gold'
                                                }`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-darkBrown mb-2">
                                            <FiPhone className="inline mr-2" />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 123-4567"
                                            className={`w-full px-4 py-3 bg-cream/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all ${errors.phone ? 'border-red-400' : 'border-beige focus:border-gold'
                                                }`}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h2 className="text-xl font-serif font-bold text-darkBrown mb-6 flex items-center gap-2">
                                    <FiMapPin className="text-gold" />
                                    Shipping Address
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-darkBrown mb-2">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="123 Main Street, Apt 4B"
                                            className={`w-full px-4 py-3 bg-cream/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all ${errors.address ? 'border-red-400' : 'border-beige focus:border-gold'
                                                }`}
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-darkBrown mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="New York"
                                                className={`w-full px-4 py-3 bg-cream/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all ${errors.city ? 'border-red-400' : 'border-beige focus:border-gold'
                                                    }`}
                                            />
                                            {errors.city && (
                                                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-darkBrown mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                placeholder="NY"
                                                className={`w-full px-4 py-3 bg-cream/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all ${errors.state ? 'border-red-400' : 'border-beige focus:border-gold'
                                                    }`}
                                            />
                                            {errors.state && (
                                                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-darkBrown mb-2">
                                            ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            placeholder="10001"
                                            className={`w-full px-4 py-3 bg-cream/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all ${errors.zipCode ? 'border-red-400' : 'border-beige focus:border-gold'
                                                }`}
                                        />
                                        {errors.zipCode && (
                                            <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-darkBrown mb-2">
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Any special instructions for your order..."
                                            rows={3}
                                            className="w-full px-4 py-3 bg-cream/50 border border-beige rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button - Mobile */}
                            <div className="lg:hidden">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gold text-white rounded-xl font-bold text-lg hover:bg-darkBrown transition-colors shadow-lg shadow-gold/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FiCreditCard />
                                            Place Order - {formatCurrency(getCartTotal())}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:sticky lg:top-28 lg:self-start"
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-serif font-bold text-darkBrown mb-6 flex items-center gap-2">
                                <FiShoppingBag className="text-gold" />
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.cartItemId}
                                        className="flex gap-4 p-3 bg-cream/50 rounded-xl"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-beige flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-darkBrown text-sm truncate">
                                                {item.name}
                                            </h4>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-xs bg-gold/20 text-gold px-1.5 py-0.5 rounded">
                                                    {item.size}
                                                </span>
                                                <span className="text-xs bg-sage/30 text-darkBrown px-1.5 py-0.5 rounded">
                                                    {item.yarnType}
                                                </span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span className="text-xs text-darkBrown/60">
                                                    Qty: {item.quantity}
                                                </span>
                                                <span className="font-medium text-darkBrown">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="border-t border-beige pt-4 space-y-3">
                                <div className="flex justify-between text-darkBrown/70">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(getCartTotal())}</span>
                                </div>
                                <div className="flex justify-between text-darkBrown/70">
                                    <span>Shipping</span>
                                    <span className="text-sage font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-darkBrown/70">
                                    <span>Tax (estimated)</span>
                                    <span>{formatCurrency(getCartTotal() * 0.08)}</span>
                                </div>
                                <div className="border-t border-beige pt-3 flex justify-between text-xl font-bold text-darkBrown">
                                    <span>Total</span>
                                    <span className="text-gold">
                                        {formatCurrency(getCartTotal() * 1.08)}
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button - Desktop */}
                            <div className="hidden lg:block mt-6">
                                <button
                                    type="submit"
                                    form="checkout-form"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gold text-white rounded-xl font-bold text-lg hover:bg-darkBrown transition-colors shadow-lg shadow-gold/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FiCreditCard />
                                            Place Order
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-beige">
                                <div className="flex flex-wrap justify-center gap-4 text-xs text-darkBrown/50">
                                    <span className="flex items-center gap-1">
                                        🔒 Secure Checkout
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ✨ Handmade Quality
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🚚 Free Shipping
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
