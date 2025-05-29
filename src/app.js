const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");

const FRONTEND_URL = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
    : ['http://localhost:5173', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:4400'];

const createApp = () => {
    const app = express();

    // src/app.js
    const corsOptions = {
        origin: (origin, callback) => {
            const allowedOrigins = FRONTEND_URL;
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false
    };

    // Agrega esto ANTES de las rutas
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger);

    app.get('/', (req, res) => {
        res.send('API de Mr Homero');
    });

    app.use('/api', routes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use(errorHandler);

    return app;
};

module.exports = createApp;
