import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import createPaymentIntent from '../controllers/paymentController';
import AuthController from '../controllers/authController';

const router = express.Router();

// protected route that requires authentication
router.get('/profile', authMiddleware, (req, res) => {
  // Access authenticated user via req.user
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
router.post('/login', AuthController.login);

// Logout route
router.post('/logout', verifyToken, AuthController.logout);

module.exports = router;
