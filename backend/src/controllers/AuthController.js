const AuthService = require("../services/AuthService");

module.exports = {
  login: async (req, res) => {
    const data = await AuthService.login(req.body);

    if (data.status === 401)
      return res.status(401).json({ message: data.message });

    return res.status(200).json({ token: data.message });
  },
  validateToken: async (req, res) => {
    let token = req.headers.authorization;

    if (token.includes("Bearer ")) {
      token = token.split(" ")[1];
    }

    const data = await AuthService.validateToken(token);

    if (data.status === 401)
      return res.status(401).json({ message: data.message });

    return res.status(200).json({ data: data.message });
  },
};
