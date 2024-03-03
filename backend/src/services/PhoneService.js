const Phone = require("../database/models/Phone");

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
  editPhone: async (data) => {
    const { name, brand, price, color, model, id } = data;

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
};
