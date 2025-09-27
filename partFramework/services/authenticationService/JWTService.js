const jwt = require('jsonwebtoken');

class JWTService {
  constructor(secretKey, expiresIn = '24h') {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  // Method to generate a JWT token
  generateToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  // Method to verify and decode a JWT token
  async verifyToken(token) {
    try {
      return await jwt.verify(token, this.secretKey);
    } catch (err) {
      return null
    }
  }
}

module.exports = JWTService
// Example usage:

// Instantiate the JWTService class
// const jwtService = new JWTService('your-very-secure-secret', '1h');

// // Generate a token
// const payload = {
//   userId: 123,
//   username: 'JohnDoe',
//   role: 'admin'
// };

// const token = jwtService.generateToken(payload);
// console.log('Generated Token:', token);

// // Verify and decode the token
// try {
//   const decoded = jwtService.verifyToken(token);
//   console.log('Decoded Payload:', decoded);
// } catch (error) {
//   console.error(error.message);
// }
