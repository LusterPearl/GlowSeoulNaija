import express from 'express';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// protected route that requires authentication
router.get('/profile', authMiddleware, (req, res) => {
  // Access authenticated user via req.user
  res.json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
