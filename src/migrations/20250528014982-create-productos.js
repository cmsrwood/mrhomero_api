'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('productos', {
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
        defaultValue: 1
      },
      id_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id_categoria'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    },);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  }
};
