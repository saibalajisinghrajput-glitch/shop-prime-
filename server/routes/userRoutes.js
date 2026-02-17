import express from 'express';
import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  addAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);
router.put('/password', protect, updatePassword);
router.post('/address', protect, addAddress);
router.delete('/address/:id', protect, deleteAddress);
router.post('/wishlist/:productId', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.get('/wishlist', protect, getWishlist);

export default router;

