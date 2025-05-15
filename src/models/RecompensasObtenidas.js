const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const RecompensasObtenidas = sequelize.define(
    "Recompensas_obt",
    {
        id_recomp_obt: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_recomp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codigo: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        fecha_reclamo: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false
    }
)

module.exports = RecompensasObtenidas