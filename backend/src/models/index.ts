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

export { sequelize, models };
