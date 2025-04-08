const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");

const FRONTEND_URL = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
    : ['http://localhost:5173', 'http://localhost:8081'];

const createApp = () => {
    const app = express();

    // Middlewares
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || FRONTEND_URL.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('No autorizado por CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger);

    // Rutas
    app.use('/api', routes);

    //Ruta Swagger
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/', (req, res) => {
        res.send('API de Mr. Homero');
    });

    // Manejo de errores global
    app.use(errorHandler);

    return app;
};

module.exports = createApp;
