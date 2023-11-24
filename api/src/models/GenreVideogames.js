const { DataTypes } = require("sequelize");
const { Videogame } = require("./Videogame");
const { Genre } = require("./Genre");
module.exports = (sequelize) => {
  const GenreVideogames = sequelize.define("GenreVideogame", {
    // Clave foránea para Videogame
    videogameId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Videogame, // Nombre del modelo Videogame
        key: "id", // Nombre de la columna en el modelo Videogame
      },
    },
    // Clave foránea para Genre
    genreId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Genre, // Nombre del modelo Genre
        key: "id", // Nombre de la columna en el modelo Genre
      },
    },
  });

  return GenreVideogames;
};
