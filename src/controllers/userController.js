import User from '../models/user.js';

class UserController {
  // 1. Get all user profiles (Admin only) - GET /profiles
  static async getAllProfiles(req, res) {
    try {
      const users = await User.findAll();  // Retrieve all users from the database
      return res.json(users);  // Return all user data
    } catch (error) {
      console.error('Error fetching all user profiles:', error);
      return res.status(500).json({ message: 'Error fetching user profiles', error });
    }
  }

  // 2. Update authenticated user profile - PUT /profile
  static async updateProfile(req, res) {
    const userId = req.user.id;  // Get user ID from the request object
    const { username, email } = req.body;  // Extract profile fields from the request body
    const avatar = req.file ? req.file.path : null;  // Handle avatar upload if provided

    try {
      const updatedData = { username, email };
      if (avatar) {
        updatedData.avatar = avatar;  // Include avatar if a file was uploaded
      }

      const updated = await User.update(userId, updatedData);  // Update user data in the database
      if (updated) {
        return res.json({ message: 'Profile updated successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ message: 'Error updating profile', error });
    }
  }

  // 3. Get authenticated user profile - GET /profile
  static async getProfile(req, res) {
    const userId = req.user.id;  // Get user ID from the request object
    try {
      const user = await User.findById(userId);  // Fetch user data by ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);  // Return the user data
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ message: 'Error fetching user profile', error });
    }
  }

  // 4. Update authenticated user profile - PUT /profile
  static async updateProfile(req, res) {
    const userId = req.user.id;  // Get user ID from the request object
    const { firstName, lastName, address } = req.body;  // Extract profile fields from the request body
    const avatar = req.file ? req.file.path : null;  // Handle avatar upload if provided

    try {
      const updatedData = { firstName, lastName, address };
      if (avatar) {
        updatedData.avatar = avatar;  // Include avatar if a file was uploaded
      }

      const updated = await User.update(userId, updatedData);  // Update user data in the database
      if (updated) {
        return res.json({ message: 'Profile updated successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ message: 'Error updating profile', error });
    }
  }

  // 5. Upload profile picture - POST /profile/picture
  static async uploadProfilePicture(req, res) {
    const userId = req.user.id;
    const avatar = req.file ? req.file.path : null;

    if (!avatar) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      // Update user's avatar path
      const updated = await User.uploadProfilePicture(userId, avatar);

      if (!updated) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
      console.error('Error uploading profile picture:', error); // Log the error
      return res.status(500).json({ message: 'Error uploading profile picture', error });
    }
  }


  // 6. Delete authenticated user profile - DELETE /profile
  static async deleteProfile(req, res) {
    const userId = req.user.id;  // Get user ID from the request object

    try {
      const deleted = await User.delete(userId);  // Delete user by ID
      if (deleted) {
        return res.json({ message: 'Profile deleted successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      return res.status(500).json({ message: 'Error deleting profile', error });
    }
  }

  // 7. Delete a specific user profile (Admin only) - DELETE /profiles/:id
  static async deleteProfileById(req, res) {
    const { id } = req.params;  // Get user ID from URL parameters

    try {
      const deleted = await User.delete(id);  // Delete user by ID
      if (deleted) {
        return res.json({ message: 'User profile deleted successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      console.error('Error deleting user profile by admin:', error);
      return res.status(500).json({ message: 'Error deleting user profile', error });
    }
  }
}

export default UserController;
