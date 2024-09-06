import User from '../models/user.js';

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
    const avatar = req.file ? req.file.path : null;

    try {
      const updatedData = { firstName, lastName, address };
      if (avatar) {
        updatedData.avatar = avatar;  // Save avatar path if a file was uploaded
      }
      
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
}

export default UserController;
