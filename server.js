const os = require('os');
const connectDB = require('./src/config/db');
const createApp = require('./src/app');
const port = process.env.PORT || 4400;

const getLocalIP = () => {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
};

const startServer = async () => {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Crear la app
        const app = createApp();

        // Iniciar el servidor en 0.0.0.0 para aceptar conexiones externas
        app.listen(port, '0.0.0.0', () => {
            const localIP = getLocalIP();
            console.log(`Servidor ejecutando en:`);
            console.log(`- Local:    http://localhost:${port}`);
            console.log(`- Red:      http://${localIP}:${port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
