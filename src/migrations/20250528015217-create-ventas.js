'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('ventas', {
      id_venta: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      venta_fecha: {
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
      },
      venta_metodo_pago: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      venta_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      venta_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
    },);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ventas');
  }
};
