const { DataTypes } = require("sequelize")
const sequelize = require("../database/database");

// Definición del modelo DetalleVentas
const EmpleadosHoras = sequelize.define(
    "empleados_horas",
    {
        id_horas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "usuarios",
                key: "id_user"
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
    },
    {
        timestamps: false,
    }
)

module.exports = EmpleadosHoras