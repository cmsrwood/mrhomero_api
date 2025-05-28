const serverless = require('serverless-http');
const connectDB = require('./src/config/db');
const createApp = require('./src/app');

let server;

const bootstrap = async () => {
    if (!server) {
        await connectDB();
        const app = createApp();
        server = serverless(app);
    }
    return server;
};

module.exports.handler = async (event, context) => {
    const handler = await bootstrap();
    return handler(event, context);
};
