// server.js 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './config/logger.js';
import routes from './routes/index.js';
import dbClient from './config/db.js';
import redisClient from './config/redis.js';
import errorHandler from './middleware/errorHandler.js';
import authenticate from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

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
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use CORS middleware

// Middleware to parse JSON
app.use(express.json()); // Use express's built-in JSON parser
app.use(bodyParser.json()); // Use body-parser's JSON parser if needed for other parsing options

// Route handling
app.use('/', routes);

// Cookie Parsing Middleware
app.use(cookieParser());

// Routes
app.use('/protected', authenticate, (req, res) => {
  res.send('You have access to this protected route');
});


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
