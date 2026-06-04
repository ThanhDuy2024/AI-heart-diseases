const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../configs/database.config");

const Users = sequelize.define("Users", {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Users;