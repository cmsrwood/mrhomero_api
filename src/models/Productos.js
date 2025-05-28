const { DataTypes } = require("sequelize")
const sequelize = require("../database/database");

// Definición del modelo DetalleVentas
const Productos = sequelize.define(
    "productos",
    {
        id_producto: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        pro_nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pro_desp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pro_precio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pro_foto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pro_puntos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pro_estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_categoria: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "categorias",
                key: "id_categoria"
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Productos