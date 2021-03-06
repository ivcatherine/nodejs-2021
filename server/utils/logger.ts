const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.json()
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const logAndFormat = (methodName, params, err) => {
  logger.error(`${new Date().toISOString()} function: ${methodName}, parameters: ${params.join(',')}, error: ${err}`);
}

module.exports = {
  logger, 
  logAndFormat
}