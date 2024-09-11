import express from 'express';
import { body } from 'express-validator';
import authenticate from '../middleware/authMiddleware.js';
import createPaymentIntent from '../controllers/paymentController.js';
import AuthController from '../controllers/authController.js';
import UserController from '../controllers/userController.js';
import ProductController from '../controllers/productController.js';
import OrderController from '../controllers/orderController.js';
import handleWebhook from '../controllers/webhookController.js';
import upload from '../middleware/uploadMiddleware.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';

const router = express.Router();

// Middleware to log when the register endpoint is hit
const logRegisterHit = (req, res, next) => {
  console.log('Register endpoint hit');
  next();
};

// Protected route for testing authentication middleware
router.get('/test-auth', authenticate, (req, res) => {
  res.json({ message: 'Middleware is working!', user: req.user });
});

// Test route to simulate an error
router.get('/test-error', (req, res, next) => {
  const err = new Error('This is a test error');
  err.statusCode = 400;
  next(err); // Properly use next() to pass error to error handler
});

// Payment route
router.post('/create-payment-intent', createPaymentIntent);

// Auth Management
router.post('/register', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Must be at least 6 characters long'),
  body('username').notEmpty().withMessage('Username is required'),
], logRegisterHit, AuthController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], AuthController.login);

router.post('/logout', authenticate, AuthController.logout);

// User Profile Management
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, upload.single('profilePicture'), UserController.updateProfile);
router.post('/profile/picture', authenticate, upload.single('profilePicture'), UserController.uploadProfilePicture);
router.delete('/profile', authenticate, UserController.deleteProfile);

// Admin Routes
router.get('/profiles', authenticate, authorizeAdmin, UserController.getAllProfiles);
router.delete('/profiles/:id', authenticate, authorizeAdmin, UserController.deleteProfileById);

// Product Management
router.post('/products', authenticate, authorizeAdmin, ProductController.createProduct);  // Protected by admin authorization
router.get('/products', authenticate, ProductController.getAllProducts);
router.get('/products/:id', authenticate, ProductController.getProduct);
router.put('/products/:id', authenticate, authorizeAdmin, ProductController.updateProduct); // Protected by admin authorization
router.delete('/products/:id', authenticate, authorizeAdmin, ProductController.deleteProduct); // Protected by admin authorization
router.get('/category/:category', authenticate, ProductController.getProductsByCategory);

// Order Management
router.post('/orders', authenticate, OrderController.createOrder);
router.get('/orders/:id', authenticate, OrderController.getOrder);
router.get('/orders', authenticate, OrderController.getAllOrders);
router.put('/orders/:id', authenticate, OrderController.updateOrder);
router.delete('/orders/:id', authenticate, OrderController.deleteOrder);
router.post('/confirm-payment', authenticate, OrderController.confirmPayment);

// Webhook route
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Centralized Error Handling Middleware
router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      statusCode,
    },
  });
});

export default router;
