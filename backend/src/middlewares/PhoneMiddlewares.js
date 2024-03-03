const joiSchemas = require("../Validation/schemas");

const verifyProductSchema = (req, res, next) => {
  const data = req.body;

  const validations = [];

  const validationProduct = joiSchemas.productSchema.validate(data);
  validations.push(validationProduct.error);

  const validationProductWithDetails =
    joiSchemas.productWithDetailsSchema.validate(data);
  validations.push(validationProductWithDetails.error);

  const validationProductListSchema =
    joiSchemas.productListSchema.validate(data);
  validations.push(validationProductListSchema.error);

  const validation = validations.findIndex(
    (validation) => validation === undefined
  );

  if (validation === -1) {
    return next({ message: "Invalid Request Body", status: 400 });
  }

  const ValidationKeys = {
    0: "singleProduct",
    1: "productWithDetails",
    2: "productList",
  };

  req.type = ValidationKeys[validation];

  return next();
};

module.exports = {
  verifyProductSchema,
};
