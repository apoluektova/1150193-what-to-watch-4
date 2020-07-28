import React from "react";
import renderer from "react-test-renderer";
import FullScreenPlayer from "./full-screen-player.jsx";

const movie = {
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

it(`Full Screen Player should render correctly`, () => {
  const tree = renderer
     .create(<FullScreenPlayer
       isPlaying={false}
       progress={10}
       duration={99}
       onPlayButtonClick={() => {}}
       onFullScreenButtonClick={() => {}}
       onExitButtonClick={() => {}}
       movie={movie}
     >
       <video />
     </FullScreenPlayer>)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
