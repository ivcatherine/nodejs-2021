export {}
const logger = require("./logger")

const exceptionHandlers = () => {
  process
    .on('unhandledRejection', (reason, promise) => {
      logger.error(`${new Date().toISOString()} Unhandeled rejection at ${promise}, reason: ${reason}`)
  }).on('uncaughtException', err => {
      logger.error(`${new Date().toISOString()} Uncaught exception: ${err}`)
      process.exit(1);
  });
}

module.exports = exceptionHandlers