import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiPackage } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { orderAPI, customOrderAPI } from '../utils/api';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);
    const [customOrders, setCustomOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
    });

    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        } else if (activeTab === 'custom') {
            fetchCustomOrders();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        try {
            const { data } = await orderAPI.getMyOrders();
            setOrders(data);
        } catch (error) {
            toast.error('Failed to load orders');
        }
    };

    const fetchCustomOrders = async () => {
        try {
            const { data } = await customOrderAPI.getMyOrders();
            setCustomOrders(data);
        } catch (error) {
            toast.error('Failed to load custom orders');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfile(formData);
        } catch (error) {
            // Error is handled by AuthContext
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setFormData({
                ...formData,
                address: { ...formData.address, [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: FiUser },
        { id: 'orders', label: 'Orders', icon: FiShoppingBag },
        { id: 'custom', label: 'Custom Orders', icon: FiPackage },
    ];

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
                        My Account
                    </h1>
                    <p className="text-darkBrown/70">Welcome back, {user?.name}!</p>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-4 shadow-md">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${activeTab === tab.id
                                            ? 'bg-gold text-white'
                                            : 'text-darkBrown hover:bg-beige'
                                        }`}
                                >
                                    <tab.icon />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <motion.div
                                className="bg-white rounded-2xl p-8 shadow-md"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h2 className="text-2xl font-serif font-bold text-darkBrown mb-6">
                                    Profile Information
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-darkBrown font-medium mb-2">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-darkBrown font-medium mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-darkBrown font-medium mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-serif font-bold text-darkBrown mb-4">
                                            Shipping Address
                                        </h3>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                name="address.street"
                                                value={formData.address.street}
                                                onChange={handleChange}
                                                placeholder="Street Address"
                                                className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                            />
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="address.city"
                                                    value={formData.address.city}
                                                    onChange={handleChange}
                                                    placeholder="City"
                                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                                />
                                                <input
                                                    type="text"
                                                    name="address.state"
                                                    value={formData.address.state}
                                                    onChange={handleChange}
                                                    placeholder="State"
                                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="address.zipCode"
                                                    value={formData.address.zipCode}
                                                    onChange={handleChange}
                                                    placeholder="ZIP Code"
                                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                                />
                                                <input
                                                    type="text"
                                                    name="address.country"
                                                    value={formData.address.country}
                                                    onChange={handleChange}
                                                    placeholder="Country"
                                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 btn-ripple"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'orders' && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h2 className="text-2xl font-serif font-bold text-darkBrown mb-6">
                                    Order History
                                </h2>

                                {orders.length === 0 ? (
                                    <div className="bg-white rounded-2xl p-12 text-center">
                                        <p className="text-darkBrown/70">No orders yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-white rounded-2xl p-6 shadow-md">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-serif font-bold text-darkBrown">
                                                            Order #{order._id.slice(-8)}
                                                        </h3>
                                                        <p className="text-sm text-darkBrown/60">
                                                            {formatDate(order.createdAt)}
                                                        </p>
                                                    </div>
                                                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="space-y-2 mb-4">
                                                    {order.orderItems.map((item, index) => (
                                                        <div key={index} className="flex justify-between text-sm">
                                                            <span className="text-darkBrown/70">{item.name} x {item.quantity}</span>
                                                            <span className="text-darkBrown font-medium">
                                                                {formatCurrency(item.price * item.quantity)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="border-t border-darkBrown/10 pt-4 flex justify-between font-bold">
                                                    <span>Total</span>
                                                    <span>{formatCurrency(order.totalPrice)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'custom' && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h2 className="text-2xl font-serif font-bold text-darkBrown mb-6">
                                    Custom Orders
                                </h2>

                                {customOrders.length === 0 ? (
                                    <div className="bg-white rounded-2xl p-12 text-center">
                                        <p className="text-darkBrown/70">No custom orders yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {customOrders.map((order) => (
                                            <div key={order._id} className="bg-white rounded-2xl p-6 shadow-md">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-serif font-bold text-darkBrown">
                                                            {order.productType}
                                                        </h3>
                                                        <p className="text-sm text-darkBrown/60">
                                                            {formatDate(order.createdAt)}
                                                        </p>
                                                    </div>
                                                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-darkBrown/70 mb-2">{order.description}</p>
                                                {order.estimatedPrice && (
                                                    <p className="text-darkBrown font-medium">
                                                        Estimated Price: {formatCurrency(order.estimatedPrice)}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
