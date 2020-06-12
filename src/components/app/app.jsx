import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const movieCardTitleHandler = () => {};

const App = (props) => {
  const {title, genre, releaseDate, movieCardTitles} = props;

  return (
    <Main
      title={title}
      genre={genre}
      releaseDate={releaseDate}
      movieCardTitles={movieCardTitles}
      onMovieCardTitleClick={movieCardTitleHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  movieCardTitles: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired
};

export default App;
