const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs-2021', 'postgres', 'qwerty1234', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;