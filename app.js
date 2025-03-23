const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const logRequestResponse = require("./middlewares/loggerMiddleware");
const cookieParser = require('cookie-parser');

/**
 * Initializes and configures the Express app.
 *
 * @param {Object} routes - The routes to be used by the application.
 * @returns {Promise<express.Application>} - Returns the configured Express app.
 */
const setupApp = async (routes) => {
  try {
    
    const app = express();

    // CORS configuration
    app.use(cors({
      origin: process.env.NODE_ENV === 'production' ? "http://localhost:5500" : "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }));

    // Handle preflight requests
    app.options('*', cors());

    // Middleware
    app.use(express.json());
    app.use(logRequestResponse);
    app.use(cookieParser());

    // Routes
    app.use("/", routes);

    // Error Handling Middleware
    app.use(errorHandler);

    return app;
  } catch (error) {
    throw new Error(`App setup failed: ${error.message}`);
  }
};

module.exports = setupApp;
