const { DataTypes } = require("sequelize")
const sequelize = require("../database/database");

// Definición del modelo DetalleVentas
const Proveedores = sequelize.define(
    "proveedores",
    {
        id_proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prov_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prov_direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prov_contacto_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prov_contacto_telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prov_contacto_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prov_activo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Proveedores