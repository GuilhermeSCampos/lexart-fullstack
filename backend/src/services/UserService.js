const User = require("../database/models/User");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (data) => {
    try {
      const { username, password } = data;

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: encryptedPassword,
      });

      return user;
    } catch (error) {
      throw new Error("Error creating user");
    }
  },
};
