const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuarios = sequelize.define(
    "usuarios",
    {
        id_user: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        user_nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_apels: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_tel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_puntos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_foto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_pass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_reset_code: {
            type: DataTypes.STRING(7),
            allowNull: true,
        },
        user_reset_code_expiration: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        user_fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "roles",
                key: "id_rol"
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        user_estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false
    }
)

module.exports = Usuarios