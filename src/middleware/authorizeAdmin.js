// middlewares/authorizeAdmin.js
const authorizeAdmin = (req, res, next) => {
    // Assuming the user object is available in req.user and has an 'isAdmin' field
      console.log('User object:', req.user); // Log the user object for debugging
      
      if (req.user && req.user.isAdmin) {
          return next();
      }
      
      return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
  };
  
  export default authorizeAdmin;
  