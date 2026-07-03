import Movie from '../models/movie.models.js';
import { Op } from 'sequelize';


export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al obtener las películas.' });
  }
};


export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    
    if (!movie) {
      return res.status(404).json({ error: 'La película con el ID requerido no existe.' });
    }
    
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


export const createMovie = async (req, res) => {
  try {
    const { title, genre, duration, year, synopsis } = req.body;
    const currentYear = new Date().getFullYear(); 


    if (!title || !genre || duration === undefined || year === undefined) {
      return res.status(400).json({ error: 'Los campos title, genre, duration y year son obligatorios y no pueden estar vacíos.' });
    }


    if (!Number.isInteger(duration) || duration <= 0) {
      return res.status(400).json({ error: 'La duración debe ser un número entero válido mayor a cero.' });
    }


    if (!Number.isInteger(year) || year < 1888 || year > currentYear) {
      return res.status(400).json({ error: `El año debe ser un número entero válido de 4 dígitos entre 1888 y ${currentYear}.` });
    }


    if (synopsis !== undefined && typeof synopsis !== 'string') {
      return res.status(400).json({ error: 'El campo synopsis debe ser una cadena de texto.' });
    }


    const existingMovie = await Movie.findOne({ where: { title } });
    if (existingMovie) {
      return res.status(400).json({ error: 'Ya existe un registro con ese título.' });
    }

    const newMovie = await Movie.create({ title, genre, duration, year, synopsis });
    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(500).json({ error: 'Error al intentar registrar la película.' });
  }
};


export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, duration, year, synopsis } = req.body;
    const currentYear = new Date().getFullYear();


    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: 'La película con el ID requerido no existe.' });
    }


    if (!title || !genre || duration === undefined || year === undefined) {
      return res.status(400).json({ error: 'Los campos title, genre, duration y year son obligatorios.' });
    }


    if (!Number.isInteger(duration) || duration <= 0) {
      return res.status(400).json({ error: 'La duración debe ser un número entero válido mayor a cero.' });
    }


    if (!Number.isInteger(year) || year < 1888 || year > currentYear) {
      return res.status(400).json({ error: `El año debe ser un número entero de 4 dígitos entre 1888 y ${currentYear}.` });
    }


    if (synopsis !== undefined && typeof synopsis !== 'string') {
      return res.status(400).json({ error: 'El campo synopsis debe ser una cadena de texto.' });
    }


    const duplicateTitle = await Movie.findOne({
      where: {
        title,
        id: { [Op.ne]: id }
      }
    });
    if (duplicateTitle) {
      return res.status(400).json({ error: 'Ya existe otra película registrada con ese título.' });
    }

    await movie.update({ title, genre, duration, year, synopsis });
    return res.status(200).json({ message: 'Película actualizada con éxito.', movie });
  } catch (error) {
    return res.status(500).json({ error: 'Error al intentar actualizar la película.' });
  }
};


export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;


    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: 'La película con el ID requerido no existe.' });
    }

    await movie.destroy();
    return res.status(200).json({ message: 'Película eliminada correctamente.' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al intentar eliminar la película.' });
  }
};