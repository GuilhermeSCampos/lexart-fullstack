const { Model, DataTypes } = require("sequelize");

class Phone extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        color: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Phone;
