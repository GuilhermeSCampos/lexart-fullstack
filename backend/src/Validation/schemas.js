const Joi = require("joi");

// Define um esquema para um único produto
const productSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required(),
  color: Joi.string().required(),
});

// Define um esquema para um produto com detalhes aninhados
const productWithDetailsSchema = Joi.object({
  name: Joi.string().required(),
  details: Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    color: Joi.string().required(),
  }),
  price: Joi.number().required(),
});

// Define um esquema para uma lista de produtos com dados aninhados
const productListSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    data: Joi.array()
      .items(
        Joi.object({
          price: Joi.number().required(),
          color: Joi.string().required(),
        })
      )
      .required(),
  })
);

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  productSchema,
  productWithDetailsSchema,
  productListSchema,
  userSchema,
};
