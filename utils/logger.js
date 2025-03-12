const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Define your custom format
const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: 'info', // Adjust log level as needed (error, warn, info, debug)
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // To log error stack traces
    myFormat
  ),
  transports: [
    // Log to console
    new transports.Console(),
    // Log to a file
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })
  ]
});

module.exports = logger;
