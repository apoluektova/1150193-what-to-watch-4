import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";

const movieCardTitleHandler = () => {};
const movieCardHoverHandler = () => {};

const App = (props) => {
  const {title, genre, releaseDate, movies} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            title={title}
            genre={genre}
            releaseDate={releaseDate}
            movies={movies}
            onMovieCardTitleClick={movieCardTitleHandler}
            onMovieCardHover={movieCardHoverHandler}
          />
        </Route>
        <Route exact path="/movie-details">
          <MovieDetails />
        </Route>
      </Switch>
    </BrowserRouter>
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
