import { Model, DataTypes, Sequelize } from 'sequelize';

export interface NoteAttributes {
  id?: number;
  content: string;
}

export class Note extends Model<NoteAttributes> implements NoteAttributes {
  public id!: number;
  public content!: string;

  // other attributes and methods can be defined here
}

export function initialize(sequelize: Sequelize): typeof Note {
  Note.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'notes',
    sequelize: sequelize,
  });

  return Note;
}
