// middlewares/authorizeAdmin.js
const authorizeAdmin = (req, res, next) => {
    // Assuming the user object is available in req.user and has an 'isAdmin' field
    if (req.user && req.user.isAdmin) {
      return next(); // User is admin, proceed to the next middleware or route handler
    }
    
    // User is not an admin
    return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
  };
  
  export default authorizeAdmin;
  