import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbClient from '../config/db';
import redisClient from '../config/redis';

const app = express();
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies of requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
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
