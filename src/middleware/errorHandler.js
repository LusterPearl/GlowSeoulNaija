/**
 * Middleware to handle errors centrally across the application.
 * @param {Object} err - The error object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next function to call in the middleware chain.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
  
    // Define error response structure
    const errorResponse = {
      status: 'error',
      message: err.message || 'Internal Server Error',
      code: err.statusCode || 500,
      // Optionally include additional info like error details
      details: err.details || null,
    };
  
    // Set the appropriate HTTP status code
    res.status(err.statusCode || 500).json(errorResponse);
  };
  
  export default errorHandler;
  