import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/index';
import dbClient from './config/db';
import redisClient from './config/redis';

// Load environment variables from .env file
dotenv.config();

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

// Start both MongoDB and Redis connections
Promise.all([dbClient.connect(), redisClient.connect()])
  .then(() => {
    // Both MongoDB and Redis are connected
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

// Handle errors from MongoDB and Redis
dbClient.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

redisClient.on('error', (err) => {
  console.error('Redis Connection Error:', err);
  process.exit(1);
});
