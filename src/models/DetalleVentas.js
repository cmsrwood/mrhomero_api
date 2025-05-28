const { DataTypes } = require("sequelize")
const sequelize = require("../database/database");

// Definición del modelo DetalleVentas
const DetalleVentas = sequelize.define(
    "detalle_ventas",
    {
        id_detalle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_venta: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'ventas',
                key: 'id_venta'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        id_producto: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "productos",
                key: "id_producto"
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        cantidad_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_unitario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)

module.exports = DetalleVentas