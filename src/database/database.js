require('dotenv').config();
const { Sequelize } = require('sequelize')

const sequelizeDB = new Sequelize(
    process.env.DB_NAME || 'mrhomero',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        port: process.env.DB_PORT || 3306,
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false
    }
)

module.exports = sequelizeDB