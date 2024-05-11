import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User'; // Import the User model

/* Define the attributes of the Note model */
export interface NoteAttributes {
  id?: number;
  content: string;
  userId?: number; // Assuming each note may be associated with a user
}
//Define the Note model 
export class Note extends Model<NoteAttributes> implements NoteAttributes {
  public id!: number;
  public content!: string;
  public userId!: number;

  // Custom method to get a description of the note
  public getDescription(): string {
    return `Note ${this.id}: ${this.content}`;
  }

  // Initialize model with sequelize instance
  static initModel(sequelize: Sequelize): typeof Note {
    Note.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Content must not be empty." }, // Validation to ensure content is not empty
        },
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true, // Assuming it might be optional
      },
    }, {
      // Other model options
      sequelize,
      tableName: 'notes',
      hooks: {
        beforeCreate: (note, options) => {
          console.log('About to create a note:', note.content);
        },
        afterCreate: (note, options) => {
          console.log('Created a note with id:', note.id);
        },
      }
    });

    return Note;
  }

  // Model associations
  static associate(models: any) {
    // This assumes a "models" object that contains all your models which has been imported
    Note.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}
