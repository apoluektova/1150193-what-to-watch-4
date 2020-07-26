import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const movie = {
  id: 1,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `The Grand Budapest Hotel`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#A6B7AC`,
  poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2014,
  description: `The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson, which explores tragedy, war, fascism, nostalgia, friendship, and loyalty.`,
  rating: {
    score: 9.3,
    count: 250,
  },
  director: `Wes Anderson`,
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: `1h 39m`,
  isFavorite: false,
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
        isPlaying={false}
        onVideoPlay={() => {}}
        onVideoStop={() => {}}
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
        isPlaying={false}
        onVideoPlay={() => {}}
        onVideoStop={() => {}}
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
        isPlaying={false}
        onVideoPlay={() => {}}
        onVideoStop={() => {}}
      />
  );

  const movieCardTitle = movieCard.find(`.small-movie-card__link`);
  movieCardTitle.simulate(`click`);

  expect(onMovieCardClick).toHaveBeenCalledTimes(1);
});
