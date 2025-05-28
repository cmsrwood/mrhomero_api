'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventario', {
      id_producto_inv: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      inv_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inv_fecha_ing: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      inv_fecha_cad: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      inv_cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inv_cantidad_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "proveedores",
          key: "id_proveedor"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inventario');
  }
};
