const express = require('express');
const swaggerInitializer = require('../common/swagger.initializer');
const authRoutes = require('./authRoutes');

class ApiRoute {
  constructor() {
    this.router = express.Router();
  }

  init() {
    try {
      /**
       * Home route - Base route handler.
       */
      // this.router.use('', homeRoutes);

      /**
       * Unified route - Base route handler.
       */
      this.router.use('', authRoutes);

      /**
       * Swagger API documentation initializer.
       */
      swaggerInitializer.init(this.router);
    } catch (error) {
      console.error('Error initializing API routes:', error.message);
    }
  }
}

const apiRoute = new ApiRoute();
apiRoute.init();

module.exports = apiRoute.router;