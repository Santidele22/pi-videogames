const {
  allVideogames,
  createGame,
  deleteGame,
  getVideoGamesFromDatabase,
  getVideoGamesFromAPI,
} = require("../services/videogamesServices.js");
const { validateNewGame } = require("../validation/validation.js");
const getAllVideogames = async (req, res) => {
  try {
    const { name } = req.query;
    const videogames = await allVideogames();
    console.log(videogames);
    if (name) {
      const filteredByName = videogames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredByName.length === 0) {
        return res.status(404).json({ Message: "Not found" });
      }
      return res.json(filteredByName);
    }
    res.json(videogames);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const getVideogameById = async (req, res) => {
  try {
    const { id } = req.params;
    const videogames = await allVideogames();
    const filteredGame = videogames.find((game) => game.id == id);
    if (filteredGame) {
      return res.json(filteredGame);
    } else {
      res.status(404).json({ Message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createVideogame = async (req, res) => {
  const errors = validateNewGame(req.body);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  try {
    const gameCreated = await createGame(req.body);
    res.status(201).json(gameCreated);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
const deleteVideogame = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllVideogames,
  getVideogameById,
  createVideogame,
};
