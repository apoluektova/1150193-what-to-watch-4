import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  previewImage: `img/moonrise-kingdom.jpg`,
  title: `Moonrise Kingdom`,
};

it(`MovieCard should render correctly`, () => {
  const tree = renderer
     .create(<MovieCard
       movie={movie}
       onMovieCardClick={() => {}}
       onMovieCardHover={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
