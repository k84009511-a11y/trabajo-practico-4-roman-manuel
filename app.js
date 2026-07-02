import express from 'express';
import { sequelize } from './src/config/database.js';
import movieRoutes from './src/routes/movie.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/api/movies', movieRoutes);


const startServer = async () => {
  try {
    await sequelize.sync(); 
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  }
};

startServer();