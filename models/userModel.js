const { Sequelize, DataTypes, Model } = require('sequelize');
const { createDB } = require("../config/db");

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

module.exports = User;
