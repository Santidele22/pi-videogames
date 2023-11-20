const { Router } = require("express");
const {
  getAllVideogames,
  getVideogameById,
  createVideogame,
} = require("../controllers/videogamesController");
const { getAllGenres } = require("../controllers/genreController");

const router = Router();

router.get("/videogames", getAllVideogames);
router.get("/videogames/:id", getVideogameById);
router.post("/videogames", createVideogame);
router.get("/genres", getAllGenres);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
