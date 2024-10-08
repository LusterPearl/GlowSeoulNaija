// server.js 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import logger from './config/logger.js';
import routes from './routes/index.js';
import dbClient from './config/db.js';
import redisClient from './config/redis.js';
import errorHandler from './middleware/errorHandler.js';

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Use logger for critical info
logger.info('Loaded Stripe Secret Key in server.js: ' + process.env.STRIPE_SECRET_KEY); // Log the Stripe secret key

//console.log('Loaded Stripe Secret Key in server.js:', process.env.STRIPE_SECRET_KEY);

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5001;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use CORS middleware

// Set static directory for serving files (e.g., uploads)
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));


// Set static directory for serving files (e.g., uploads)

// Middleware to parse JSON
app.use(express.json()); // Use express's built-in JSON parser
app.use(bodyParser.json()); // Use body-parser's JSON parser if needed for other parsing options

// Route handling
app.use('/', routes);

// Error handling middleware after all routes
app.use(errorHandler);

// Start the server once the database is connected
dbClient.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Connect to Redis separately
redisClient.client.on('error', (err) => {
  console.error('Redis error:', err);
});
