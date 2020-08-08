import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player";
import {Movie} from "../../types";

const movie: Movie = {
  id: 1,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  backgroundImage: `https://loremflickr.com/cache/resized/65535_49876816733_f1ba86707f_h_1280_543_nofilter.jpg`,
  backgroundColor: `#A6B7AC`,
  poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
  genre: `Fantasy`,
  releaseDate: 2018,
  description: `The plot follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.`,
  rating: {
    score: 8.9,
    count: 240,
  },
  director: `David Yates`,
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: 99,
  isFavorite: false,
};

configure({
  adapter: new Adapter(),
});

it(`Video Player should have a play state`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        muted={true}
        src={movie.previewVideo}
        poster={movie.previewImage}
        isPlaying={true}
      />
  );

  expect(videoPlayer.props().isPlaying).toEqual(true);
});

it(`Video Player should have a pause state`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        muted={true}
        src={movie.previewVideo}
        poster={movie.previewImage}
        isPlaying={false}
      />
  );

  expect(videoPlayer.props().isPlaying).toEqual(false);
});
