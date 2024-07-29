// middleware/errorHandler.js
import logger from '../config/logger.js'; // Import the logger

/**
 * Middleware to handle errors centrally across the application.
 * @param {Object} err - The error object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next function to call in the middleware chain.
 */
const errorHandler = (err, req, res, next) => {
    logger.error(err.stack); // Log the error stack for debugging

    // Define error response structure
    const errorResponse = {
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Show stack trace in development
    };

    res.status(err.status || 500).json(errorResponse); // Send error response to client
};

export default errorHandler;
