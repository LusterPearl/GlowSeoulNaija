import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import paymentController from '../controllers/paymentController';

const router = express.Router();

// protected route that requires authentication
router.get('/profile', authMiddleware, (req, res) => {
  // Access authenticated user via req.user
  res.json({ message: `Welcome, ${req.user.username}!` });
});

// Payment route
router.post('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;
