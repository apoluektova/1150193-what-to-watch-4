import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Film = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

ReactDOM.render(
    <App
      title={Film.TITLE}
      genre={Film.GENRE}
      releaseDate={Film.RELEASE_DATE}
    />,
    document.querySelector(`#root`)
);
