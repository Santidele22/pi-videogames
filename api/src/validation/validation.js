async function validateNewGame(game) {
  const errors = {};

  if (!game.name || typeof game.name !== "string" || game.name.trim() === "") {
    errors.name =
      "El nombre del juego es obligatorio y debe ser una cadena no vacía.";
  }

  if (
    !game.platforms ||
    !Array.isArray(game.platforms) ||
    game.platforms.length === 0
  ) {
    errors.platforms =
      "Debes proporcionar al menos una plataforma para el juego.";
  }

  const releaseDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!game.release_date || !releaseDateRegex.test(game.release_date)) {
    errors.release_date =
      "La fecha de lanzamiento debe estar en formato YYYY-MM-DD.";
  }

  if (typeof game.rating !== "number" || game.rating < 0 || game.rating > 5) {
    errors.rating = "La calificación debe ser un número entre 0 y 5.";
  }

  if (!game.genres || !Array.isArray(game.genres) || game.genres.length === 0) {
    errors.genres = "Debes proporcionar al menos un género para el juego.";
  }

  if (
    !game.image ||
    typeof game.image !== "string" ||
    game.image.trim() === ""
  ) {
    errors.image =
      "La URL de la imagen es obligatoria y debe ser una cadena no vacía.";
  }

  if (
    !game.description ||
    typeof game.description !== "string" ||
    game.description.trim() === ""
  ) {
    errors.description =
      "La descripción del juego es obligatoria y debe ser una cadena no vacía.";
  }

  return errors;
}

module.exports = {
  validateNewGame,
};
