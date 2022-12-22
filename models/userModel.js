const { Sequelize, DataTypes, Model } = require('sequelize');
const { createDB } = require("../config/db");
const orderModel = require('./orderModels')

const User = createDB.define("users", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    isSeller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

User.hasMany(orderModel, {foreignKey: "id" });
orderModel.belongsTo(User, { foreignKey: "buyerId" });

module.exports = User;

