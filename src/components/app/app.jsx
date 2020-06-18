import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const movieCardTitleHandler = () => {};
const movieCardHoverHandler = () => {};

const App = (props) => {
  const {title, genre, releaseDate, movies} = props;

  return (
    <Main
      title={title}
      genre={genre}
      releaseDate={releaseDate}
      movies={movies}
      onMovieCardTitleClick={movieCardTitleHandler}
      onMovieCardHover={movieCardHoverHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.exact({
        previewImage: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })).isRequired,
};

export default App;
