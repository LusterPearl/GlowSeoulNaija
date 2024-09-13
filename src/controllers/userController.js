import User from '../models/user.js';
import validator from 'validator'; 
import upload from '../middleware/uploadMiddleware.js';

const validateUserInput = (username, email) => {
  if (!username || !validator.isAlphanumeric(username)) {
    throw new Error('Invalid username. Only alphanumeric characters are allowed.');
  }
  if (!email || !validator.isEmail(email)) {
    throw new Error('Invalid email format.');
  }
};

class UserController {
  static async getProfile(req, res) {
    const userId = req.user.id;
    console.log('User ID:', userId);
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching user profile', error });
    }
  }

  static async updateProfile(req, res) {
    const userId = req.user.id;
    const { firstName, lastName, address } = req.body;

    try {
      const updated = await User.update(userId, { firstName, lastName, address });
      if (updated) {
        return res.json({ message: 'Profile updated successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating profile', error });
    }
  }

  static async deleteProfile(req, res) {
    const userId = req.user.id;

    try {
      const deleted = await User.delete(userId);
      if (deleted) {
        return res.json({ message: 'Profile deleted successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting profile', error });
    }
  }

  // POST: Upload a new profile picture
static async uploadProfilePicture(req, res) {
  // Handling file upload with middleware
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const userId = req.params.userId;
    const profilePicturePath = req.file.path; // Accessing the uploaded file path

    try {
      // Update the user's profile picture path in the database
      const updated = await User.update(userId, { profilePicture: profilePicturePath });
      if (updated) {
        return res.json({ message: 'Profile picture uploaded successfully.', path: profilePicturePath });
      }
      return res.status(404).json({ message: 'User not found.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading profile picture.', error });
    }
  });
}

// PUT: Update an existing profile picture
static async updateProfilePicture(req, res) {
  // Handling file upload with middleware
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const userId = req.params.userId;
    const profilePicturePath = req.file.path; // Accessing the uploaded file path

    try {
      // Update the user's profile picture path in the database
      const updated = await User.update(userId, { profilePicture: profilePicturePath });
      if (updated) {
        return res.json({ message: 'Profile picture updated successfully.', path: profilePicturePath });
      }
      return res.status(404).json({ message: 'User not found.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating profile picture.', error });
    }
  });
}

  // Endpoint to create a new user profile (POST)
  static async createUserProfile(req, res) {
    try {
      const { username, email } = req.body;
      validateUserInput(username, email); // Validate input
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }
  
      // Create new user
      const user = new User({ username, email });
      await user.save();
      res.status(201).json({ message: 'User created successfully.', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  // Endpoint to replace both username and email (PUT)
  static async replaceUserProfile(req, res) {
    const userId = req.params.userId;
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required.' });
    }

    try {
      const updated = await User.update(userId, { username, email });
      if (updated) {
        return res.json({ message: 'User profile updated successfully.' });
      }
      return res.status(404).json({ message: 'User not found.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user profile.', error });
    }
  };

  // Endpoint to partially update either username or email (PATCH)
  static async updateUserProfile(req, res) {
    try {
      const { username, email } = req.body;
      validateUserInput(username, email); // Validate input
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }
  
      // Create new user
      const user = new User({ username, email });
      await user.save();
      res.status(201).json({ message: 'User created successfully.', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default UserController;