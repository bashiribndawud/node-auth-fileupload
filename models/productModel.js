const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");
const userModel = require("./userModel");
const Product = createDB.define("products", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  price: DataTypes.DECIMAL,
  content: DataTypes.STRING,
});

// Product.belongsTo(userModel, {foreignKey: ""});

module.exports = Product;
