const User = require("../database/models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const secretKey = process.env.JWT_SECRET;

module.exports = {
  login: async (data) => {
    try {
      const { username, password } = data;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        throw new Error("Invalid username or password");
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        throw new Error("Invalid username or password");
      }

      const token = jwt.createToken({ username });

      return { message: token, status: 200 };
    } catch (error) {
      return { message: error.message, status: 401 };
    }
  },
  validateToken: async (token) => {
    const decoded = await jwt.ValidateToken(token);

    if (!decoded) {
      return { message: "Invalid token", status: 401 };
    }

    return { message: decoded, status: 200 };
  },
};
