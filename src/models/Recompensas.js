const { DataTypes } = require("sequelize")
const sequelize = require("../database/database");

const Recompensas = sequelize.define(
    "recompensas",
    {
        id_recomp: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        recompensa_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recompensa_descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recompensa_num_puntos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recomp_foto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recomp_estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Recompensas