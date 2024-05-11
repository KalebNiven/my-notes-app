import { Sequelize } from 'sequelize';

// Initialize a new Sequelize instance with PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',  // Specify the dialect for PostgreSQL
  host: 'localhost',
  database: 'mynotes',
  username: 'postgres', // Update with your username, postgres is the default
  password: '1234',  // Update with your password
  port: 5432,
});

export default sequelize;
