const joiSchemas = require("../Validation/schemas");
const jwt = require("../utils/jwt");

const verifyUserSchema = (req, _res, next) => {
  const data = req.body;

  const validation = joiSchemas.userSchema.validate(data);

  if (validation.error) {
    return next({ message: "Invalid Request Body", status: 400 });
  }

  return next();
};

const verifyTokenExists = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ message: "Token not found", status: 401 });
  }

  return next();
};

const validateToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (token.includes("Bearer ")) {
    token = token.split(" ")[1];
  }

  const decoded = jwt.ValidateToken(token);

  if (!decoded) {
    return next({ message: "Expired or invalid token", status: 401 });
  }

  return next();
};

module.exports = {
  verifyUserSchema,
  verifyTokenExists,
  validateToken,
};
