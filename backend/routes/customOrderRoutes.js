import express from 'express';
import {
    createCustomOrder,
    getCustomOrderById,
    getMyCustomOrders,
    getAllCustomOrders,
    updateCustomOrder,
    deleteCustomOrder,
} from '../controllers/customOrderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createCustomOrder).get(protect, admin, getAllCustomOrders);
router.get('/my-orders', protect, getMyCustomOrders);
router
    .route('/:id')
    .get(protect, getCustomOrderById)
    .put(protect, admin, updateCustomOrder)
    .delete(protect, deleteCustomOrder);

export default router;
