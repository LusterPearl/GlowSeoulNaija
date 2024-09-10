import express from 'express';
import { body, validationResult } from 'express-validator';
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
  next(); // Proceed to the next middleware/controller
};

// Protected route
router.get('/test-auth', authenticate, (req, res) => {
  res.json({ message: 'Middleware is working!', user: req.user });
});

// Test route to simulate an error
router.get('/test-error', (req, res) => {
  // Simulate an error
  const err = new Error('This is a test error');
  err.statusCode = 400;
  throw err;
});

// Payment route
router.post('/create-payment-intent', createPaymentIntent);

// Auth Management
// Registration route with validation
router.post('/register', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Must be at least 6 characters long'),
  body('username').notEmpty().withMessage('Username is required'),
], AuthController.register);

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
router.post('/products', authenticate, ProductController.createProduct);
router.get('/products', authenticate, ProductController.getAllProducts);
router.get('/products/:id', authenticate, ProductController.getProduct);
router.put('/products/:id', authenticate, ProductController.updateProduct);
router.delete('/products/:id', authenticate, ProductController.deleteProduct);
router.get('/category/:category', authenticate, ProductController.getProductsByCategory);

// Order Management
router.post('/orders', authenticate, OrderController.createOrder); // Create new order
router.get('/orders/:id', authenticate, OrderController.getOrder); // Get order by ID
router.get('/orders', authenticate, OrderController.getAllOrders); // Get all orders
router.put('/orders/:id', authenticate, OrderController.updateOrder); // Update order by ID
router.delete('/orders/:id', authenticate, OrderController.deleteOrder); // Delete order by ID
router.post('/confirm-payment', authenticate, OrderController.confirmPayment); // Payment Confirmation 

// Webhook route
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
