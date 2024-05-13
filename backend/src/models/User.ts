// src/models/User.ts
import { Model, DataTypes, Sequelize } from 'sequelize';
import { Note } from './Note'; 


export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
}
//Define the User model
export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // Initialize model with sequelize instance
  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize,
      tableName: 'users'
    });

    return User;
  }

  // Model associations
  static associate(models: { Note: typeof Note; }) {
    // Each user can have multiple notes
    User.hasMany(models.Note, { foreignKey: 'userId', as: 'notes' });
  }
}
