import express from 'express';
import { sequelize } from './src/config/database.js';
import movieRoutes from './src/routes/movie.routes.js';

const app = express();
const PORT = 3000;


app.use(express.json());


app.use('/api/movies', movieRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Conexión a MySQL establecida y modelos sincronizados con éxito.');
    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error crítico al inicializar el servidor:', error.message);
  }
};

startServer();