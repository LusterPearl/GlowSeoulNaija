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


const router = express.Router();

// Middleware to log when the register endpoint is hit
const logRegisterHit = (req, res, next) => {
  console.log('Register endpoint hit');
  next(); // Proceed to the next middleware/controller
};

// Route to handle profile picture upload
router.post('/api/users/:userId/profile-picture', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // Save the file path or URL to the database as needed
    res.status(200).json({ message: 'Profile picture uploaded successfully.', filePath: req.file.path });
  });
});

// Middleware to serve profile pictures securely
router.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);

  // You can add more security checks here, e.g., check if the user is authorized to access the file
  res.sendFile(filePath);
});


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
router.put('/profile', authenticate, UserController.updateProfile);
router.delete('/profile', authenticate, UserController.deleteProfile);

// Profile Picture Management
router.post('/profile/:userId/profile-picture', authenticate, UserController.uploadProfilePicture);  // Upload a new profile picture
router.put('/profile/:userId/profile-picture', authenticate, UserController.updateProfilePicture);   // Update an existing profile picture

// User Information Management (Username and Email)
router.post('/profile', authenticate, UserController.createUserProfile);                           // Create a new user profile
router.put('/profile/:userId', authenticate, UserController.replaceUserProfile);                    // Replace both username and email
router.patch('/profile/:userId', authenticate, UserController.updateUserProfile);   

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