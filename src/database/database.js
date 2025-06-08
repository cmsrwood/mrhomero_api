require('dotenv').config();
const { Sequelize } = require('sequelize')

const sequelizeDB = new Sequelize(
    process.env.NODE_ENV === 'production' ? process.env.DB_NAME : 'mrhomero',
    process.env.NODE_ENV === 'production' ? process.env.DB_USER : 'root',
    process.env.NODE_ENV === 'production' ? process.env.DB_PASS : '',
    {
        port: process.env.DB_PORT || 3306,
        host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST : 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false
    }
)

module.exports = sequelizeDB