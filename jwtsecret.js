const crypto = require('crypto');

// Generate a random secret of appropriate length (e.g., 32 characters)
const generateJWTSecret = () => crypto.randomBytes(32).toString('hex');

console.log(generateJWTSecret()); // Print the generated secret
