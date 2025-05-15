const { DataTypes } = require("sequelize")
const sequelize = require("../database/database");

// Definición del modelo DetalleVentas
const Inventario = sequelize.define(
    "inventario",
    {
        id_producto_inv: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        inv_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inv_fecha_ing: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        inv_fecha_cad: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        inv_cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inv_cantidad_min: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Inventario