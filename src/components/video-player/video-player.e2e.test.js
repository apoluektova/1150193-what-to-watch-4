import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

const movie = {
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Video Player should have a play state`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        className="player__video"
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
        className="player__video"
        muted={true}
        src={movie.previewVideo}
        poster={movie.previewImage}
        isPlaying={false}
      />
  );

  expect(videoPlayer.props().isPlaying).toEqual(false);
});
