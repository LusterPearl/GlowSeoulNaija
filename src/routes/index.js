import express from 'express';
import authenticate from '../middleware/authMiddleware';
import createPaymentIntent from '../controllers/paymentController';
import AuthController from '../controllers/authController';

const router = express.Router();

// Protected route that requires authentication
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!` });
});

// Payment route
router.post('/create-payment-intent', createPaymentIntent);

// Registration route
router.post('/auth/register', (req, res) => {
  console.log('Register endpoint hit');
  AuthController.register(req, res);
});

// Login route
router.post('/auth/login', AuthController.login);

// Logout route
router.post('/auth/logout', authenticate, AuthController.logout); // Use authenticate here

export default router;
