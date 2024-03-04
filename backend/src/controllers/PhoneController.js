const PhoneService = require("../services/PhoneService");

module.exports = {
  create: async (req, res) => {
    const type = req.type;

    let data;
    switch (type) {
      case "singleProduct":
        data = await PhoneService.createSingleProduct(req.body);
        break;
      case "productWithDetails":
        data = await PhoneService.createProductWithDetails(req.body);
        break;
      case "productList":
        data = await PhoneService.createProductList(req.body);
        break;
      default:
        break;
    }

    return res.status(201).json(data);
  },
  getAll: async (req, res) => {
    const phones = await PhoneService.getAll();

    return res.status(200).json(phones);
  },
  editPhone: async (req, res) => {
    const phone = await PhoneService.editPhone(req.body, req.params.id);

    return res.status(200).json(phone);
  },
  deletePhone: async (req, res) => {
    const phone = await PhoneService.deletePhone(req.params.id);

    return res.status(200).json(phone);
  },
  getById: async (req, res) => {
    const phone = await PhoneService.getById(req.params.id);

    return res.status(200).json(phone);
  },
  getByQuery: async (req, res) => {
    const { query } = req.query;

    const phones = await PhoneService.getByQuery(query);
    return res.status(200).json(phones);
  },
};
