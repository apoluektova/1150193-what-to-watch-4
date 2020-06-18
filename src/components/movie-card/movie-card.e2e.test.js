import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const movie = {
  previewImage: `img/moonrise-kingdom.jpg`,
  title: `Moonrise Kingdom`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Movie card should be hovered`, () => {
  const onMovieCardHover = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onMovieCardTitleClick={() => {}}
        onMovieCardHover={onMovieCardHover}
      />
  );

  const smallMovieCards = movieCard.find(`.small-movie-card`);

  smallMovieCards.forEach((card) => card.props().onMouseEnter());

  expect(onMovieCardHover).toHaveBeenCalledTimes(1);
});
