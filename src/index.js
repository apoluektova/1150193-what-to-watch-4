import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {movies} from "./mocks/movies.js";

const Movie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

ReactDOM.render(
    <App
      title={Movie.TITLE}
      genre={Movie.GENRE}
      releaseDate={Movie.RELEASE_DATE}
      movies={movies}
    />,
    document.querySelector(`#root`)
);
