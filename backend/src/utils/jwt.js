require("dotenv").config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

module.exports = {
  createToken: (data) => {
    const token = jwt.sign(data, secretKey, { expiresIn: "7d" }); // Expira em 1 hora
    return token;
  },
  ValidateToken: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (error) {
      return false;
    }
  },
};
