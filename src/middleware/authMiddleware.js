import { verifyToken, isTokenBlacklisted } from '../config/jwt';

/**
 * Middleware to authenticate incoming requests using JWT.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next function to call in the middleware chain.
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract Authorization header
    const authHeader = req.header('Authorization');

    // Check if Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Missing or invalid Authorization header' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.replace('Bearer ', '');

    // If no token is present, deny access
    if (!token) {
      return res.status(401).send({ message: 'Access Denied' });
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
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export default authenticate;
