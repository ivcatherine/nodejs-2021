export {};
const sequelize = require('./sequelize');
const { app } = require('./app');

const PORT = 3000;

async function init() {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
  
  app.listen(PORT, err => {
      if (err) {
          return console.error(err);
      }
      return console.log(`server is listening on ${PORT}`);
  });
};

init();

module.exports = sequelize;