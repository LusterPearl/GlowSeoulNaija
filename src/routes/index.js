// index.js
import express from 'express';
import authenticate from '../middleware/authMiddleware';
import createPaymentIntent from '../controllers/paymentController';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import ProductController from '../controllers/productController';

const router = express.Router();

// Protected route
router.get('/test-auth', authenticate, (req, res) => {
  res.json({ message: 'Middleware is working!', user: req.user });
});

// Payment route
router.post('/create-payment-intent', createPaymentIntent);

// Registration route
router.post('/register', AuthController.register);

// Login route
router.post('/login', AuthController.login);

// Logout route
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

export default router;
