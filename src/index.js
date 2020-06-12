import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Movie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const TITLES = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`,
  `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`,
  `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `Midnight Special`,
  `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
  `Midnight Special`];

ReactDOM.render(
    <App
      title={Movie.TITLE}
      genre={Movie.GENRE}
      releaseDate={Movie.RELEASE_DATE}
      movieCardTitles={TITLES}
    />,
    document.querySelector(`#root`)
);
