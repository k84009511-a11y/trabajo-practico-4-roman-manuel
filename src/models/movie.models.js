import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: true 
  }
}, {
  timestamps: false 
});

export default Movie;