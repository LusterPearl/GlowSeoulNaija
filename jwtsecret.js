import crypto from 'crypto';

// Function to generate JWT secret
const generateJWTSecret = () => crypto.randomBytes(32).toString('hex');

console.log(generateJWTSecret()); 

export default generateJWTSecret;
