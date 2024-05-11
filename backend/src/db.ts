import { Sequelize } from 'sequelize';

/* No longer in use, look at models/index.ts */


// Initialize a new Sequelize instance with PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',  // Specify the dialect for PostgreSQL
  host: 'localhost',
  database: 'mynotes',
  username: 'postgres', // Update with your username, postgres is the default
  password: 'asdf',  // Update with your password
  port: 5432,
});

export default sequelize;
