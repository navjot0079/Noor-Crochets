import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiDollarSign, FiUsers, FiShoppingBag } from 'react-icons/fi';
import { productAPI, orderAPI, customOrderAPI } from '../utils/api';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customOrders, setCustomOrders] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            if (activeTab === 'products' || activeTab === 'overview') {
                const { data } = await productAPI.getAll();
                setProducts(data);
            }
            if (activeTab === 'orders' || activeTab === 'overview') {
                const { data } = await orderAPI.getAll();
                setOrders(data);
            }
            if (activeTab === 'custom-orders' || activeTab === 'overview') {
                const { data } = await customOrderAPI.getAll();
                setCustomOrders(data);
            }
        } catch (error) {
            toast.error('Failed to load data');
        }
    };

    const stats = [
        {
            label: 'Total Products',
            value: products.length,
            icon: FiPackage,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            label: 'Total Orders',
            value: orders.length,
            icon: FiShoppingBag,
            color: 'bg-green-100 text-green-600',
        },
        {
            label: 'Custom Orders',
            value: customOrders.length,
            icon: FiUsers,
            color: 'bg-purple-100 text-purple-600',
        },
        {
            label: 'Revenue',
            value: formatCurrency(orders.reduce((sum, order) => sum + order.totalPrice, 0)),
            icon: FiDollarSign,
            color: 'bg-gold/20 text-gold',
        },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'products', label: 'Products' },
        { id: 'orders', label: 'Orders' },
        { id: 'custom-orders', label: 'Custom Orders' },
    ];

    const updateOrderStatus = async (orderId, status) => {
        try {
            await orderAPI.updateStatus(orderId, status);
            toast.success('Order status updated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const updateCustomOrderStatus = async (orderId, status) => {
        try {
            await customOrderAPI.update(orderId, { status });
            toast.success('Custom order status updated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

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
                        Admin Dashboard
                    </h1>
                    <p className="text-darkBrown/70">Manage your store</p>
                </motion.div>

                {/* Stats */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-darkBrown mb-1">{stat.value}</div>
                                <div className="text-darkBrown/60 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-2xl p-2 shadow-md mb-8 flex gap-2 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-gold text-white'
                                    : 'text-darkBrown hover:bg-beige'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-md">
                    {activeTab === 'overview' && (
                        <div className="p-8">
                            <h2 className="text-2xl font-serif font-bold text-darkBrown mb-6">
                                Recent Activity
                            </h2>
                            <div className="space-y-4">
                                <h3 className="font-bold text-darkBrown">Recent Orders</h3>
                                {orders.slice(0, 5).map((order) => (
                                    <div key={order._id} className="flex justify-between items-center p-4 bg-beige/30 rounded-xl">
                                        <div>
                                            <p className="font-medium text-darkBrown">Order #{order._id.slice(-8)}</p>
                                            <p className="text-sm text-darkBrown/60">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-darkBrown">{formatCurrency(order.totalPrice)}</p>
                                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-serif font-bold text-darkBrown">Products</h2>
                                <button
                                    onClick={() => setShowProductModal(true)}
                                    className="px-6 py-2 bg-gold text-white rounded-full hover:bg-gold/90 transition-colors"
                                >
                                    Add Product
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-darkBrown/10">
                                            <th className="text-left py-3 px-4 font-medium text-darkBrown">Name</th>
                                            <th className="text-left py-3 px-4 font-medium text-darkBrown">Category</th>
                                            <th className="text-left py-3 px-4 font-medium text-darkBrown">Price</th>
                                            <th className="text-left py-3 px-4 font-medium text-darkBrown">Stock</th>
                                            <th className="text-left py-3 px-4 font-medium text-darkBrown">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product._id} className="border-b border-darkBrown/10 hover:bg-beige/20">
                                                <td className="py-3 px-4">{product.name}</td>
                                                <td className="py-3 px-4">{product.category}</td>
                                                <td className="py-3 px-4">{formatCurrency(product.price)}</td>
                                                <td className="py-3 px-4">{product.stock}</td>
                                                <td className="py-3 px-4">
                                                    <button className="text-gold hover:text-gold/70 mr-3">Edit</button>
                                                    <button className="text-red-500 hover:text-red-700">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="p-8">
                            <h2 className="text-2xl font-serif font-bold text-darkBrown mb-6">All Orders</h2>
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order._id} className="border border-darkBrown/10 rounded-xl p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-darkBrown">Order #{order._id.slice(-8)}</h3>
                                                <p className="text-sm text-darkBrown/60">{formatDate(order.createdAt)}</p>
                                                <p className="text-sm text-darkBrown/60">Customer: {order.user?.name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-darkBrown text-xl">{formatCurrency(order.totalPrice)}</p>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    className={`mt-2 px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {order.orderItems.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span>{item.name} x {item.quantity}</span>
                                                    <span>{formatCurrency(item.price * item.quantity)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'custom-orders' && (
                        <div className="p-8">
                            <h2 className="text-2xl font-serif font-bold text-darkBrown mb-6">Custom Orders</h2>
                            <div className="space-y-4">
                                {customOrders.map((order) => (
                                    <div key={order._id} className="border border-darkBrown/10 rounded-xl p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-darkBrown">{order.productType}</h3>
                                                <p className="text-sm text-darkBrown/60">{formatDate(order.createdAt)}</p>
                                                <p className="text-sm text-darkBrown/60">Customer: {order.user?.name}</p>
                                            </div>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateCustomOrderStatus(order._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewing">Reviewing</option>
                                                <option value="approved">Approved</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                        <p className="text-darkBrown/70 mb-2">{order.description}</p>
                                        <div className="flex gap-3 text-sm text-darkBrown/60">
                                            <span>Colors: {order.colors.join(', ')}</span>
                                            <span>Size: {order.size}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
