import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const Movie = {
  TITLE: `Harry Potter`,
  GENRE: `Comedy`,
  RELEASE_DATE: 2009,
};

const MOVIE_TITLES = [
  `Made for Each Other`,
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

it(`App renders correctly`, () => {
  const tree = renderer
     .create(<App
       title={Movie.TITLE}
       genre={Movie.GENRE}
       releaseDate={Movie.RELEASE_DATE}
       movieCardTitles={MOVIE_TITLES}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
