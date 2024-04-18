const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    colorize(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger;
