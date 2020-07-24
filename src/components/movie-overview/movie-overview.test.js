import React from "react";
import renderer from "react-test-renderer";
import MovieOverview from "./movie-overview.jsx";

const movie = {
  previewImage: `img/aviator.jpg`,
  previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `Aviator`,
  backgroundImage: `https://loremflickr.com/cache/resized/65535_49800111821_ae7805f489_h_1280_543_nofilter.jpg`,
  poster: `https://loremflickr.com/cache/resized/65535_50063687282_2595a7661e_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2004,
  description: `Based on the 1993 non-fiction book Howard Hughes: The Secret Life by Charles Higham, the film depicts the life of Howard Hughes, an aviation pioneer and director of Hell's Angels. The film portrays his life from 1927–1947 during which time Hughes became a successful film producer and an aviation magnate while simultaneously growing more unstable due to severe obsessive–compulsive disorder (OCD).`,
  rating: {
    score: 8.7,
    level: `Very good`,
    count: 241,
  },
  director: `Martin Scorsese`,
  actors: `Leonardo DiCaprio, Cate Blanchett, and Kate Beckinsale`,
  runtime: `1h 39m`,
};

it(`MovieOverview should render correctly`, () => {
  const tree = renderer
     .create(<MovieOverview
       movie={movie}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
