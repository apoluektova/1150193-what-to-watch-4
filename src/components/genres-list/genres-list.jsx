import React from "react";
import PropTypes from "prop-types";
import Genre from "../genre/genre.jsx";

const MAX_GENRES_AMOUNT = 9;

const GenresList = (props) => {
  const {onGenreClick, activeGenre, genresList} = props;

  return (
    <ul className="catalog__genres-list">
      {genresList.slice(0, MAX_GENRES_AMOUNT).map((genre, index) => {
        return (
          <Genre
            key={`${genre}-${index}`}
            genreName={genre}
            onGenreClick={onGenreClick}
            activeGenre={activeGenre}
          />
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  genresList: PropTypes.array.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
};

export default GenresList;
