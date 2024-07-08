import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dbClient from '../config/db'; // Adjust the path as per your project structure
import redisClient from '../config/redis'; // Adjust the path as per your project structure

const app = express();
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies of requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
router.use('/users', userRoutes);
router.use('/products', productRoutes);
app.use('/api', router); // Mount the router under /api

// Database connection check (assuming dbClient emits 'connected' event)
dbClient.on('connected', () => {
  console.log('Connected to database');
});

// Redis connection check (assuming redisClient is already connected)
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Health check endpoint
app.get('/status', (req, res) => {
  res.json({ status: 'OK' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
