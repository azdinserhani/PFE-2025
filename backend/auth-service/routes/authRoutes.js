import express from 'express';
import authController from '../controllers/authController.js';
import validateRequest from '../middleware/validateRequest.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);

// Protected routes that require authentication
router.get('/profile', authenticate, authController.getProfile);
router.post('/change-password', authenticate, authController.changePassword);
router.get('/validate-token', authenticate, authController.validateToken);

export default router; 