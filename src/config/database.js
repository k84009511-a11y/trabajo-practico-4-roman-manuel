import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize('movies', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});