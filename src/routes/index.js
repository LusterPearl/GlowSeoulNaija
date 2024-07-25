// index.js
import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import createPaymentIntent from '../controllers/paymentController.js';
import AuthController from '../controllers/authController.js';
import UserController from '../controllers/userController.js';
import ProductController from '../controllers/productController.js';
import OrderController from '../controllers/orderController.js';
import handleWebhook from '../controllers/webhookController.js';

const router = express.Router();

// Protected route
router.get('/test-auth', authenticate, (req, res) => {
  res.json({ message: 'Middleware is working!', user: req.user });
});

// Payment route
router.post('/create-payment-intent', createPaymentIntent);

// Auth Management
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', authenticate, AuthController.logout);

// User Profile Management
router.get('/profile', authenticate, UserController.getProfile);
router.put('/profile', authenticate, UserController.updateProfile);
router.delete('/profile', authenticate, UserController.deleteProfile);

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
