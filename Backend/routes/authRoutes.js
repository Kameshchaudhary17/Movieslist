import express from 'express';
const router = express.Router();
import { 
  register, 
  login, 
  getMe, 
  logout 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router;
