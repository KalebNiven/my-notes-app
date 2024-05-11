import { Sequelize } from 'sequelize';
import { Note } from './Note';
import { User } from './User';

const sequelize = new Sequelize('postgres://user:password@localhost:5432/database');

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

// Test connection and sync models
async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();  // This line can be commented out in production
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { sequelize, models, connectDb };
