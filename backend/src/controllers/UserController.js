const UserService = require("../services/UserService");

module.exports = {
  register: async (req, res) => {
    const user = await UserService.register(req.body);

    return res.status(201).json(user);
  },
};
