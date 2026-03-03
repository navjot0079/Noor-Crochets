import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// @desc    Create new order from cart
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        // Validate shipping address
        if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email ||
            !shippingAddress.phone || !shippingAddress.address || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.zipCode) {
            return res.status(400).json({ message: 'Please provide complete shipping address' });
        }

        // Get cart items
        const cart = await Cart.findOne({ customerId: req.user._id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate totals
        const subtotal = cart.getTotal();
        const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
        const shippingCost = 0; // Free shipping
        const totalPrice = Math.round((subtotal + tax + shippingCost) * 100) / 100;

        // Create order items from cart
        const orderItems = cart.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            category: item.category,
            basePrice: item.basePrice,
            size: item.size,
            yarnType: item.yarnType,
            price: item.price,
            quantity: item.quantity,
        }));

        // Create order
        const order = new Order({
            customerId: req.user._id,
            orderItems,
            shippingAddress,
            subtotal,
            tax,
            shippingCost,
            totalPrice,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            statusHistory: [
                {
                    status: 'pending',
                    timestamp: new Date(),
                    note: 'Order placed',
                },
            ],
        });

        const createdOrder = await order.save();

        // Clear the cart after successful order
        cart.items = [];
        cart.lastUpdated = Date.now();
        await cart.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order: createdOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create order from items (without cart)
// @route   POST /api/orders/direct
// @access  Private
export const createDirectOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Validate shipping address
        if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email ||
            !shippingAddress.phone || !shippingAddress.address || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.zipCode) {
            return res.status(400).json({ message: 'Please provide complete shipping address' });
        }

        // Calculate totals
        const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.08 * 100) / 100;
        const shippingCost = 0;
        const totalPrice = Math.round((subtotal + tax + shippingCost) * 100) / 100;

        const order = new Order({
            customerId: req.user._id,
            orderItems,
            shippingAddress,
            subtotal,
            tax,
            shippingCost,
            totalPrice,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            statusHistory: [
                {
                    status: 'pending',
                    timestamp: new Date(),
                    note: 'Order placed',
                },
            ],
        });

        const createdOrder = await order.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order: createdOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customerId', 'name email');

        if (order) {
            // Check if user owns this order or is admin
            if (order.customerId._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized to view this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by order number
// @route   GET /api/orders/number/:orderNumber
// @access  Private
export const getOrderByNumber = async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber })
            .populate('customerId', 'name email');

        if (order) {
            if (order.customerId._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized to view this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('customerId', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order payment status
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.paymentStatus = 'paid';
            order.paidAt = Date.now();

            order.statusHistory.push({
                status: 'paid',
                timestamp: new Date(),
                note: 'Payment received',
            });

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            const newStatus = req.body.status;
            const note = req.body.note || '';

            order.status = newStatus;

            order.statusHistory.push({
                status: newStatus,
                timestamp: new Date(),
                note,
            });

            if (newStatus === 'delivered') {
                order.deliveredAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check ownership
        if (order.customerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to cancel this order' });
        }

        // Can only cancel pending or confirmed orders
        if (!['pending', 'confirmed'].includes(order.status)) {
            return res.status(400).json({ message: 'Cannot cancel order at this stage' });
        }

        order.status = 'cancelled';
        order.statusHistory.push({
            status: 'cancelled',
            timestamp: new Date(),
            note: req.body.reason || 'Cancelled by customer',
        });

        const updatedOrder = await order.save();
        res.json({
            message: 'Order cancelled successfully',
            order: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
