import jwt from 'jsonwebtoken';

const setupJWT = (app) => {
  app.use((req, res, next) => {
    // Example: Middleware to check for JWT token and authenticate
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(' ')[1]; // Standard JavaScript without optional chaining

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Attach user information to the request object
        next();
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

  console.log('JWT middleware setup complete');
};

export default setupJWT;
