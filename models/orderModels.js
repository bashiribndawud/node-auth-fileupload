const {DataTypes} = require('sequelize');
const userModel = require('./userModel')
const { createDB } = require('../config/db');


const OrderModel = createDB.define("orders", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
});



module.exports = OrderModel