import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken, blacklistToken, extractToken } from '../config/jwt';
import dbClient from '../config/db';

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
      return res.status(200).json({ token, userId: user._id });
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
    const token = extractToken(req.headers);
    if (!token) {
      return res.status(401).send({ message: 'Missing or invalid Authorization header' });
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      await blacklistToken(token, expiresIn);
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new AuthController();
