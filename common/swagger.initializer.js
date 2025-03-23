const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Swagger definition options.
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Express application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

/**
 * Swagger setup function.
 * @param {Object} router - The Express router.
 */
const init = (router) => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = { init };
