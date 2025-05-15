const { DataTypes } = require("sequelize")
const sequelize = require("../database/database")

// Definición del modelo categorías
const Categorias = sequelize.define(
    "categorias",
    {
        id_categoria: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        cat_nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cat_foto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cat_estado: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = Categorias