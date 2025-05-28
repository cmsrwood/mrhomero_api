'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorias', {
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
    },);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categorias');
  }
};
