'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('proveedores', {
      id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      prov_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prov_direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prov_contacto_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prov_contacto_telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prov_contacto_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prov_activo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('proveedores');
  }
};
