const { allVideogames } = require("../services/videogamesServices");

const getAllVideogames = async (req, res) => {
  try {
    const { name } = req.query;
    const videogames = await allVideogames();

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
    res.status(500).json({ error: "Internal Server Error" });
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

const getVideogamesByName = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createVideogame = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllVideogames,
  getVideogameById,
  getVideogamesByName,
  createVideogame,
};
