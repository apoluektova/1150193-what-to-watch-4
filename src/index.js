import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {PROMO_MOVIE, movies} from "./mocks/movies.js";

ReactDOM.render(
    <App
      promoMovie={PROMO_MOVIE}
      movies={movies}
    />,
    document.querySelector(`#root`)
);
