import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import dbClient from '../config/db';
import redisClient from '../config/redis';

const app = express();
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies of requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.use('/api', router); // Mount the router under /api

// Database connection check (assuming dbClient emits 'connected' event)
dbClient.on('connected', () => {
  console.log('Connected to database');
});

// Redis connection check (assuming redisClient is already connected)
redisClient.client.on('ready', () => {
  console.log('Connected to Redis');
});

// Health check endpoint
app.get('/status', (req, res) => {
  res.json({ status: 'OK' });
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
