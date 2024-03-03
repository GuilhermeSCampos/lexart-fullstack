const joiSchemas = require("../Validation/schemas");

const verifyUserSchema = (req, res, next) => {
  const data = req.body;

  const validation = joiSchemas.userSchema.validate(data);

  if (validation.error) {
    return next({ message: "Invalid Request Body", status: 400 });
  }

  return next();
};

module.exports = {
  verifyUserSchema,
};
