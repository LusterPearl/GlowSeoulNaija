// config/logger.js
import winston from 'winston';

// Define the logging levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Create a Winston logger instance
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`; // Customize log format
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({
      filename: 'logs/error.log', // Log errors to a file
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/all.log', // Log all messages to a file
    }),
  ],
});

// Export the logger instance
export default logger;
