const joiSchemas = require("../Validation/schemas");

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

module.exports = {
  verifyUserSchema,
  verifyTokenExists,
};
