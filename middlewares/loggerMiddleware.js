// middlewares/loggerMiddleware.js
const logRequestResponse = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };
  
  module.exports = logRequestResponse;
  