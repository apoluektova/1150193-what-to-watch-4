import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

const MoviesList = (props) => {
  const {movies, onMovieCardTitleClick, onMovieCardHover} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, index) => {
        return (
          <MovieCard
            key={index}
            movie={movie}
            onMovieCardHover={onMovieCardHover}
            onMovieCardTitleClick={onMovieCardTitleClick}
          />
        );
      })}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.exact({
        previewImage: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })).isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
