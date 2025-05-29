'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recompensas', {
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
        defaultValue: 1
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recompensas');
  }
};
