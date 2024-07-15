import express from 'express';
import authenticate from '../middleware/authMiddleware';
import createPaymentIntent from '../controllers/paymentController';
import AuthController from '../controllers/authController';

const router = express.Router();

// Protected route
router.get('/test-auth', authenticate, (req, res) => {
  res.json({ message: 'Middleware is working!', user: req.user });
});

// Payment route
router.post('/create-payment-intent', createPaymentIntent);

// Registration route
router.post('/register', AuthController.register); // Changed to /register

// Login route
router.post('/login', AuthController.login);

// Logout route
router.post('/logout', authenticate, AuthController.logout);

export default router;
