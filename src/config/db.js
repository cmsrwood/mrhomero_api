const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'mrhomero',
        port: process.env.DB_PORT || 3306,
        connectTimeout: 10000,
    });

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Database connection error:', err);
                if (connection) connection.release();
                reject(err);
                process.exit(1);
            } else {
                console.log('Conectado a la base de datos');
                connection.release();
                global.db = pool;
                resolve(pool);
            }
        });
    });
};

module.exports = connectDB;