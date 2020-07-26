import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";

const movie = {
  id: 3,
  previewImage: `img/macbeth.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `Macbeth`,
  backgroundImage: `https://loremflickr.com/cache/resized/65535_49757902562_3b737630e4_h_1280_543_nofilter.jpg`,
  backgroundColor: `#A6B7AC`,
  poster: `https://loremflickr.com/cache/resized/65535_49816709832_c9df27e040_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2015,
  description: `The story follows a Scottish general's rise to power after receiving a prophecy from a trio of witches that one day he will become King of Scotland. Like the play it was adapted from, the film dramatises the damaging physical and psychological effects of political ambition on those who seek power for its own sake.`,
  rating: {
    score: 8.0,
    count: 234,
  },
  director: `Justin Kurzel`,
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: `1h 39m`,
  isFavorite: false,
};

it(`MovieDetails should render correctly`, () => {
  const tree = renderer
     .create(<MovieDetails
       movie={movie}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
