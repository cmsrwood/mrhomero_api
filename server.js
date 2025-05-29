const os = require('os');
const connectDB = require('./src/config/db');
const createApp = require('./src/app');
const port = process.env.PORT || 4400;
const sequelizeDB = require('./src/database/database');
const Categorias = require('./src/models/Categorias');
const DetalleVentas = require('./src/models/DetalleVentas');
const EmpleadosHoras = require('./src/models/EmpleadosHoras');
const Inventario = require('./src/models/Inventario');
const Productos = require('./src/models/Productos');
const Proveedores = require('./src/models/Proveedores');
const Recompensas = require('./src/models/Recompensas');
const RecompensasObtenidas = require('./src/models/RecompensasObtenidas');
const Roles = require('./src/models/Roles');
const Usuarios = require('./src/models/Usuarios');
const Ventas = require('./src/models/Ventas');

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
        // Sincronizar la base de datos
        await sequelizeDB.authenticate();
        await sequelizeDB.sync({ force: false });
        console.log('Base de datos sincronizada correctamente.');

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