import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Movie card title is clicked`, () => {
  const onMovieCardTitleClick = jest.fn();

  const main = shallow(
      <Main
        title={Movie.TITLE}
        genre={Movie.GENRE}
        releaseDate={Movie.RELEASE_DATE}
        movieCardTitles={MOVIE_TITLES}
        onMovieCardTitleClick={onMovieCardTitleClick}
      />
  );

  const movieCardTitles = main.find(`small-movie-card__link`);

  movieCardTitles.forEach((title) => title.props().onClick());

  expect(onMovieCardTitleClick.mock.calls.length).toBe(movieCardTitles.length);
});
