const User = require("../database/models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (data) => {
    const { username, password } = data;

    const foundUser = await User.findOne({ where: { username } });

    if (foundUser) {
      throw new Error("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: encryptedPassword,
    });

    return user;
  },
};
