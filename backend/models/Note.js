const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Note = sequelize.define('notes', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [20, 300]
    }
  }
}, {
    timestamps: false
  });



module.exports = Note;
