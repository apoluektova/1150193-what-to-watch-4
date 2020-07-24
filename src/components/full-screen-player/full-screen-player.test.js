import React from "react";
import renderer from "react-test-renderer";
import FullScreenPlayer from "./full-screen-player.jsx";

const movie = {
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `The Grand Budapest Hotel`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2014,
  description: `The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson, which explores tragedy, war, fascism, nostalgia, friendship, and loyalty.`,
  rating: {
    score: 9.3,
    level: `Awesome`,
    count: 250,
  },
  director: `Wes Anderson`,
  actors: `Ralph Fiennes, Tony Revolori, F. Murray Abraham, Mathieu Amalric, Adrien Brody, Willem Dafoe`,
  runtime: `1h 39m`,
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
