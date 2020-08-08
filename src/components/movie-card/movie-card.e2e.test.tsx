import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import {Movie} from "../../types";
import {noop} from "../../utils";

const movie: Movie = {
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
  runtime: 99,
  isFavorite: false,
};

configure({
  adapter: new Adapter(),
});

it(`Movie card should be hovered`, () => {
  const onMovieCardHover = jest.fn();

  const movieCard = mount(
      <MovieCard
        movie={movie}
        onMovieCardClick={noop}
        onMovieCardHover={onMovieCardHover}
        isPlaying={false}
        onVideoPlay={noop}
        onVideoStop={noop}
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
        onMovieCardHover={noop}
        isPlaying={false}
        onVideoPlay={noop}
        onVideoStop={noop}
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
        onMovieCardHover={noop}
        isPlaying={false}
        onVideoPlay={noop}
        onVideoStop={noop}
      />
  );

  const movieCardTitle = movieCard.find(`.small-movie-card__link`);
  movieCardTitle.simulate(`click`);

  expect(onMovieCardClick).toHaveBeenCalledTimes(1);
});
