import { verifyToken, isTokenBlacklisted } from '../config/jwt.js';

/**
 * Middleware to authenticate incoming requests using JWT stored in cookies.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next function to call in the middleware chain.
 */
const authenticate = async (req, res, next) => {
  try {
    console.log('Cookies:', req.cookies); // Debugging log

    // Extract the token from cookies
    const token = req.cookies ? req.cookies.token : null;
    console.log('Token:', token); // Debugging log

    // If no token is present, deny access
    if (!token) {
      return res.status(401).send({ message: 'Access Denied. No token provided.' });
    }

    // Check if the token is blacklisted
    const blacklisted = await isTokenBlacklisted(token);

    // If token is blacklisted, deny access
    if (blacklisted) {
      return res.status(401).send({ message: 'Token is blacklisted' });
    }

    // Verify the token
    const decoded = await verifyToken(token);

    // If token verification fails, deny access
    if (!decoded) {
      return res.status(401).send({ message: 'Invalid Token' });
    }

    // Set the decoded user information on the request object for further middleware or routes
    req.user = { id: decoded.userId }; // Set userId to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export default authenticate;
