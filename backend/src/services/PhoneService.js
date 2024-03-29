const Phone = require("../database/models/Phone");
const { Op, Sequelize } = require("sequelize");

module.exports = {
  createSingleProduct: async (data) => {
    const phone = await Phone.create({
      name: data.name,
      brand: data.brand,
      price: data.price,
      color: data.color,
      model: data.model,
    });

    return phone;
  },
  createProductWithDetails: async (data) => {
    const phone = await Phone.create({
      name: data.name,
      brand: data.details.brand,
      price: data.price,
      color: data.details.color,
      model: data.details.model,
      details: data.details,
    });

    return phone;
  },
  createProductList: async (data) => {
    const products = [];

    data.forEach((element) => {
      element.data.forEach((product) => {
        products.push({
          name: element.name,
          brand: element.brand,
          price: product.price,
          color: product.color,
          model: element.model,
        });
      });
    });

    const phones = await Phone.bulkCreate(products);

    return phones;
  },
  getAll: async () => {
    const phones = await Phone.findAll();

    return phones;
  },
  editPhone: async (data, id) => {
    const { name, brand, price, color, model } = data;

    const phone = await Phone.update(
      { name, brand, price, color, model },
      {
        where: { id },
      }
    );

    return phone;
  },
  deletePhone: async (id) => {
    const phone = await Phone.destroy({
      where: { id },
    });

    return phone;
  },
  getById: async (id) => {
    const phone = await Phone.findByPk(id);

    return phone;
  },
  getByQuery: async (query) => {
    const phones = await Phone.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { brand: { [Op.iLike]: `%${query}%` } },
          { model: { [Op.iLike]: `%${query}%` } },
          { color: { [Op.iLike]: `%${query}%` } },
          {
            price: {
              [Op.or]: [
                Sequelize.literal(`CAST(price AS TEXT) ILIKE '%${query}%'`),
              ],
            },
          },
        ],
      },
    });

    return phones;
  },
};
