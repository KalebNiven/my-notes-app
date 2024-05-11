import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User'; // Import the User model

/* Define the attributes of the Note model */
export interface NoteAttributes {
  id?: number;
  content: string;
  userId?: number; // Assuming each note may be associated with a user
}
/**
 * Define the Note model
 *
 * @property {number} id - The unique identifier for the note
 * @property {string} content - The content of the note
 * @property {number} userId - The ID of the user associated with the note (optional)
 * @method {string} getDescription() - Returns a description of the note
 * @static {typeof Note} initModel(sequelize: Sequelize) - Initializes the Note model with a Sequelize instance
 * @hook {function} beforeCreate(note, options) - Logs the content of the note before it is created
 * @hook {function} afterCreate(note, options) - Logs the ID of the note after it is created
 */
export class Note extends Model<NoteAttributes> implements NoteAttributes {
  public id!: number;
  public content!: string;
  public userId!: number;

  /**
   * Returns a description of the note
   *
   * @returns {string} The description of the note
   */
  public getDescription(): string {
    return `Note ${this.id}: ${this.content}`;
  }

  /**
   * Initializes the Note model with a Sequelize instance
   *
   * @param {Sequelize} sequelize - The Sequelize instance
   * @returns {typeof Note} The initialized Note model
   */
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
          notEmpty: { msg: "Content must not be empty." },
        },
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    }, {
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

  /**
   * Establishes a one-to-many association between the Note model and the User model.
   *
   * @param {any} models - An object containing all the models in the application.
   */
  static associate(models: any) {
    Note.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}
