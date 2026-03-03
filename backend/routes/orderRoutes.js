import express from 'express';
import {
    createOrder,
    createDirectOrder,
    getOrderById,
    getOrderByNumber,
    getMyOrders,
    getAllOrders,
    updateOrderToPaid,
    updateOrderStatus,
    cancelOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create order from cart or get all orders (admin)
router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);

// Create order directly (without cart)
router.post('/direct', protect, createDirectOrder);

// Get current user's orders
router.get('/myorders', protect, getMyOrders);

// Get order by order number
router.get('/number/:orderNumber', protect, getOrderByNumber);

// Get order by ID
router.route('/:id').get(protect, getOrderById);

// Update order payment status
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Update order status (admin)
router.route('/:id/status').put(protect, admin, updateOrderStatus);

// Cancel order
router.route('/:id/cancel').put(protect, cancelOrder);

export default router;
