import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  previewImage: `img/moonrise-kingdom.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `Moonrise Kingdom`,
};

it(`MovieCard should render correctly`, () => {
  const tree = renderer
     .create(<MovieCard
       movie={movie}
       onMovieCardClick={() => {}}
       onMovieCardHover={() => {}}
       isPlaying={false}
       onVideoPlay={() => {}}
       onVideoStop={() => {}}
     />, {
       createNodeMock: () => {
         return {};
       }
     })
     .toJSON();

  expect(tree).toMatchSnapshot();
});
