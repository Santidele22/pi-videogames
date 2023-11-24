const { allGenres } = require("../services/genreService.js");
const getAllGenres = async (req, res) => {
  // Implementa la lógica para obtener todos los géneros
  try {
    const genres = await allGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
module.exports = {
  getAllGenres,
};
