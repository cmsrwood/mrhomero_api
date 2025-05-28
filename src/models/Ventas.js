const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Ventas = sequelize.define(
    "ventas",
    {
        id_venta: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        venta_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        venta_metodo_pago: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        venta_total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        venta_estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false
    }
)

module.exports = Ventas