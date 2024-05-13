import { Sequelize } from 'sequelize';
import { Note } from './Note';
import { User } from './User';

require('dotenv').config(); // This line loads the .env file
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;

console.log(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`)

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,          // Require SSL in production
            rejectUnauthorized: true  // Do not allow unauthorized certificates
          } : false               // Disable SSL in non-production environments
      
    }
});



// Initialize models
Note.initModel(sequelize);
User.initModel(sequelize);

// Prepare a models object to handle associations
const models = { Note, User };

// Set up associations if the 'associate' method is defined
Object.values(models).forEach((model: any) => {
    if (model.associate) {
        model.associate(models);
    }
});

/**
 * Test connection and sync models
 * 
 * This function is used to establish a connection to a database using Sequelize, a promise-based Node.js ORM for PostgreSQL.
 * 
 * Here's what it does:
 * 1. It calls `sequelize.authenticate()` to check if the database connection can be established. If successful, it logs a success message.
 * 2. If the connection is successful, it calls `sequelize.sync()` to synchronize the database schema with the models defined in the application. This is useful for creating or updating the database tables based on the model definitions.
 * 3. If there's an error during the connection or synchronization process, it logs an error message.
 * 
 * Note: The `sequelize.sync()` call can be commented out in production to avoid unnecessary database schema changes.
 */
async function connectDb() {
    console.log(`Running in ${process.env.NODE_ENV || 'development'} mode`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();  // This line can be commented out in production
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { sequelize, models, connectDb };
