// import.js
//import express from 'express';
//import { body, validationResult } from 'express-validator';
//import authenticate from '../middleware/authMiddleware.js';
//import UserController from '../controllers/userController.js';
//import ProductController from '../controllers/productController.js';
//import OrderController from '../controllers/orderController.js';

//const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the GlowSeoulNaija application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid input, such as an incorrect email format or missing fields.
 *       409:
 *         description: Conflict, indicating the user already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Must be at least 6 characters long'),
  body('username').notEmpty().withMessage('Username is required'),
], UserController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token for further API access.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: your-jwt-token
 *       401:
 *         description: Invalid credentials provided by the user.
 *       500:
 *         description: Internal server error, something went wrong on the server.
 */
router.post('/login', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], UserController.login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logs out the authenticated user and invalidates the token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       401:
 *         description: Unauthorized, invalid token or session.
 *       500:
 *         description: Internal server error.
 */
router.post('/logout', authenticate, UserController.logout);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile information of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid token.
 *       500:
 *         description: Internal server error.
 */
router.get('/profile', authenticate, UserController.getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the profile information of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.put('/profile', authenticate, UserController.updateProfile);

/**
 * @swagger
 * /api/profile:
 *   delete:
 *     summary: Delete user profile
 *     description: Deletes the profile of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile deleted successfully.
 *       401:
 *         description: Unauthorized, invalid token.
 *       500:
 *         description: Internal server error.
 */
router.delete('/profile', authenticate, UserController.deleteProfile);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the catalog.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Korean Moisturizer
 *               price:
 *                 type: number
 *                 example: 20.99
 *               category:
 *                 type: string
 *                 example: Skincare
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post('/products', authenticate, ProductController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieves all products from the catalog.
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/products', ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieves product details by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/products/:id', ProductController.getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product by ID
 *     description: Updates product details by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Korean Moisturizer
 *               price:
 *                 type: number
 *                 example: 20.99
 *               category:
 *                 type: string
 *                 example: Skincare
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.put('/products/:id', authenticate, ProductController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Deletes product by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/products/:id', authenticate, ProductController.deleteProduct);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Places a new order for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d5fbbf75bb4c1a4c8f4a6a", "60d5fbc575bb4c1a4c8f4a6b"]
 *               totalPrice:
 *                 type: number
 *                 example: 41.98
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post('/orders', authenticate, OrderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves all orders for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/orders', authenticate, OrderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieves order details by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/orders/:id', authenticate, OrderController.getOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancel order by ID
 *     description: Cancels an order by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to cancel.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/orders/:id', authenticate, OrderController.deleteOrder);

//export default router;
