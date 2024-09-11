import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { generateToken, blacklistToken } from '../config/jwt.js';
import dbClient from '../config/db.js';

/**
 * @class AuthController
 * @classdesc Controller for handling authentication-related operations.
 */
class AuthController {
  /**
   * Handles user registration.
   * @async
   * @method
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>}
   */
  async register(req, res) {
    // Check for validation errors
    console.log('Register endpoint hit');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await dbClient.db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password and create the user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { email, password: hashedPassword, username };
      const result = await dbClient.db.collection('users').insertOne(newUser);

      return res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Handles user login.
   * @async
   * @method
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>}
   */
  async login(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await dbClient.db.collection('users').findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id.toString());

      // Set the JWT token in an HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
      });

      return res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Handles user logout.
   * @async
   * @method
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>}
   */
  async logout(req, res) {
    const token = req.cookies.token; // Extract token from cookies
    if (!token) {
      return res.status(401).send({ message: 'Missing or invalid Authorization token' });
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      await blacklistToken(token, expiresIn);

      // Clear the cookie
      res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new AuthController();
