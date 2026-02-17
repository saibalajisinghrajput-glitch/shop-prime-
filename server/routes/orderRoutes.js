import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrder);
router.put('/:id', protect, authorize('admin'), updateOrder);
router.get('/admin/all', protect, authorize('admin'), getAllOrders);

export default router;

