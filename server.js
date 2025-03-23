const setupApp = require('./app');
const routes = require('./routes/index');
const connectDB = require('./configs/db.config');

connectDB(); // Connect to MongoDB

setupApp(routes).then(app => {
    const logger = require('./common/logger');
    
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
        logger.info(`Swagger UI is available at http://localhost:${PORT}/docs`);
    });

    // Graceful shutdown logic
    const shutdown = (signal) => {
        console.log(`Received ${signal}. Shutting down gracefully...`);
        process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
});