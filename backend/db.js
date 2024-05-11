const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', // Specify the dialect for PostgreSQL
  host: 'localhost',
  database: 'mynotes',
  username: 'postgres',
  password: '1234', //update with your password
  port: 5432,
});

module.exports = sequelize;
