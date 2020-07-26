import React from "react";
import renderer from "react-test-renderer";
import MovieOverview from "./movie-overview.jsx";

const movie = {
  id: 3,
  previewImage: `img/macbeth.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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
  runtime: 99,
  isFavorite: false,
};

it(`MovieOverview should render correctly`, () => {
  const tree = renderer
     .create(<MovieOverview
       movie={movie}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
