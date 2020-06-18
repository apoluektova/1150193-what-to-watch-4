import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const Movie = {
  TITLE: `Harry Potter`,
  GENRE: `Comedy`,
  RELEASE_DATE: 2009,
};

const movies = [
  {
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
  },
  {
    previewImage: `img/bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
  },
  {
    previewImage: `img/macbeth.jpg`,
    title: `Macbeth`,
  },
  {
    previewImage: `img/aviator.jpg`,
    title: `Aviator`,
  },
  {
    previewImage: `img/we-need-to-talk-about-kevin.jpg`,
    title: `We need to talk about Kevin`,
  },
  {
    previewImage: `img/what-we-do-in-the-shadows.jpg`,
    title: `What We Do in the Shadows`,
  },
  {
    previewImage: `img/revenant.jpg`,
    title: `Revenant`,
  },
  {
    previewImage: `img/johnny-english.jpg`,
    title: `Johnny English`,
  },
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Movie card title is clicked`, () => {
  const onMovieCardTitleClick = jest.fn();
  const onMovieCardHover = jest.fn();

  const main = mount(
      <Main
        title={Movie.TITLE}
        genre={Movie.GENRE}
        releaseDate={Movie.RELEASE_DATE}
        movies={movies}
        onMovieCardTitleClick={onMovieCardTitleClick}
        onMovieCardHover={onMovieCardHover}

      />
  );

  const movieCardTitles = main.find(`small-movie-card__link`);

  movieCardTitles.forEach((title) => title.props().onClick());

  expect(onMovieCardTitleClick.mock.calls.length).toBe(movieCardTitles.length);
});
