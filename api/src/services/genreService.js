require("dotenv").config();
const axios = require("axios");
const { Genre } = require("../db.js");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const allGenres = async () => {
  const response = await axios(URL);
  const genres = response.data.results;

  const allGenres = genres.map((genre) => {
    return {
      name: genre.name,
    };
  });
  const savedGenres = await Promise.all(
    allGenres.map((genre) => {
      return Genre.findOrCreate({
        where: {
          name: genre.name,
        },
      });
    })
  );
  return savedGenres.map((genre) => genre[0]);
};
module.exports = {
  allGenres,
};
