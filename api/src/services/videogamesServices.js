require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideoGamesFromDatabase = async () => {
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
        through: { attributes: [] },
      },
    ],
  });

  const videogames = videoGameBD.map((videogame) => {
    const platforms =
      videogame.platforms && videogame.platforms.length > 0
        ? videogame.platforms.map((platform) => platform.platform.name)
        : [];

    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      platforms: platforms,
      image: videogame.image,
      release_date: videogame.release_date,
      rating: videogame.rating,
      source: "Database",
    };
  });

  return videogames;
};
const getVideoGamesFromAPI = async () => {
  const response = await axios.get(URL);
  const videogamesAPI = response.data.results;

  const videogameAPI = videogamesAPI.map((videogame) => {
    const platforms =
      videogame.platforms && videogame.platforms.length > 0
        ? videogame.platforms.map((platform) => platform.platform.name)
        : [];

    return {
      id: videogame.id,
      name: videogame.name,
      platforms: platforms,
      image: videogame.image_background,
      release_date: videogame.released,
      rating: videogame.rating,
      source: "Api",
    };
  });

  return videogameAPI;
};

const allVideogames = async () => {
  try {
    const [getAllVideogamesDB, getAllVideogamesAPI] = await Promise.all([
      getVideoGamesFromDatabase(),
      getVideoGamesFromAPI(),
    ]);
    return [...getAllVideogamesDB, ...getAllVideogamesAPI];
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  allVideogames,
};
