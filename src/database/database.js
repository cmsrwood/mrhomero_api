const { Sequelize } = require('sequelize')

const sequelizeDB = new Sequelize(
    process.env.DB_NAME || 'mrhomero',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'admin',
    {
        port: process.env.DB_PORT || 5432,
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false
    }
)

module.exports = sequelizeDB