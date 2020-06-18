import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

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

it(`MoviesList should render correctly`, () => {
  const tree = renderer
     .create(<MoviesList
       movies={movies}
       onMovieCardTitleClick={() => {}}
       onMovieCardHover={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
