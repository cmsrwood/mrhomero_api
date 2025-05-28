'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('recompensas_obtenidas', {
      id_recomp_obt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_recomp: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "recompensas",
          key: "id_recomp"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('recompensas_obtenidas');
  }
};
