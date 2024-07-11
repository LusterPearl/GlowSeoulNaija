import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

export default hashPassword;
