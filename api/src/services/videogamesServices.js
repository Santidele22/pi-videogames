require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const getVideoGamesFromDatabase = async () => {
  try {
    const videoGameBD = await Videogame.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "platforms",
        "image",
        "release_date",
        "rating",
      ],
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] }, // Para evitar que se incluyan las columnas adicionales de la tabla intermedia
        },
      ],
    });
    return videoGameBD;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error al obtener videojuegos de la base de datos");
  }
};

const getVideoGamesFromAPI = async () => {
  try {
    const response = await axios.get(URL);
    const videogamesAPI = response.data.results;

    const gameAPI = videogamesAPI.map((videogame) => {
      const platforms =
        videogame.platforms && videogame.platforms.length > 0
          ? videogame.platforms.map((platform) => platform.platform.name)
          : [];
      const genres =
        videogame.genres && videogame.genres.length > 0
          ? videogame.genres.map((g) => g.name)
          : [];

      return {
        id: videogame.id,
        name: videogame.name,
        platforms: platforms,
        image: videogame.image_background,
        release_date: videogame.released,
        rating: videogame.rating,
        genres: genres,
        source: "Api",
      };
    });

    return gameAPI;
  } catch (error) {
    console.error("Error al obtener videojuegos de la API:", error);
    throw new Error("Error al obtener videojuegos de la API");
  }
};

const allVideogames = async () => {
  try {
    const [getAllVideogamesDB, getAllVideogamesAPI] = await Promise.all([
      getVideoGamesFromDatabase(),
      getVideoGamesFromAPI(),
    ]);
    return [...getAllVideogamesDB, ...getAllVideogamesAPI];
  } catch (error) {
    console.error("Error al obtener todos los videojuegos:", error);
    throw new Error("Error al obtener todos los videojuegos");
  }
};

const createGame = async (game) => {
  try {
    // Crear el nuevo videojuego
    const newVideoGame = await Videogame.create({
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      image: game.image,
      release_date: game.release_date,
      rating: game.rating,
    });

    // Obtener o crear los géneros y asociarlos al nuevo videojuego
    const genresToAssociate = await Promise.all(
      game.genres.map(async (genreName) => {
        const [genre, created] = await Genre.findOrCreate({
          where: { name: genreName },
        });
        return genre;
      })
    );

    await newVideoGame.addGenres(genresToAssociate);

    return {
      success: true,
      message: "Juego creado exitosamente",
      newVideoGame,
    };
  } catch (error) {
    console.error("Error al crear el juego en la base de datos:", error);
    throw new Error(error);
  }
};

const deleteGame = async () => {
  // Agrega la lógica para eliminar un juego si es necesario
};

module.exports = {
  allVideogames,
  createGame,
  deleteGame,
  getVideoGamesFromDatabase,
  getVideoGamesFromAPI,
};
