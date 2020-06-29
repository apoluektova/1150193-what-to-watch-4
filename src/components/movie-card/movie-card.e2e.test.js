import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const movie = {
  previewImage: `img/moonrise-kingdom.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `Moonrise Kingdom`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Movie card should be hovered`, () => {
  const onMovieCardHover = jest.fn();

  const movieCard = mount(
      <MovieCard
        movie={movie}
        onMovieCardClick={() => {}}
        onMovieCardHover={onMovieCardHover}
      />
  );

  const smallMovieCard = movieCard.find(`.small-movie-card`);

  smallMovieCard.simulate(`mouseenter`, movie);

  expect(onMovieCardHover).toHaveBeenCalledTimes(1);
  expect(onMovieCardHover.mock.calls[0][0]).toMatchObject(movie);
});

it(`Movie card image should be clicked`, () => {
  const onMovieCardClick = jest.fn();

  const movieCard = mount(
      <MovieCard
        movie={movie}
        onMovieCardClick={onMovieCardClick}
        onMovieCardHover={() => {}}
      />
  );

  const movieCardImage = movieCard.find(`.small-movie-card__image`);
  movieCardImage.simulate(`click`);

  expect(onMovieCardClick).toHaveBeenCalledTimes(1);
});

it(`Movie card title should be clicked`, () => {
  const onMovieCardClick = jest.fn();

  const movieCard = mount(
      <MovieCard
        movie={movie}
        onMovieCardClick={onMovieCardClick}
        onMovieCardHover={() => {}}
      />
  );

  const movieCardTitle = movieCard.find(`.small-movie-card__link`);
  movieCardTitle.simulate(`click`);

  expect(onMovieCardClick).toHaveBeenCalledTimes(1);
});
