import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

const movie = {
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`VideoPlayer should render correctly`, () => {
  const tree = renderer
     .create(<VideoPlayer
       previewVideo={movie.previewVideo}
       previewImage={movie.previewImage}
       isPlaying={true}
     />, {
       createNodeMock: () => {
         return {
           play: () => {},
         };
       }
     }).toJSON();

  expect(tree).toMatchSnapshot();
});
