import React from "react";
import renderer from "react-test-renderer";
import MovieOverview from "./movie-overview.jsx";

const movie = {
  previewImage: `img/bohemian-rhapsody.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `Bohemian Rhapsody`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  genre: `Drama`,
  releaseDate: 2018,
  description: `A British-American venture, the film was produced by 20th Century Fox, Regency Enterprises, GK Films, and Queen Films, with Fox serving as distributor. The film follows the singer's life from the formation of the band up to their 1985 Live Aid performance at the original Wembley Stadium.`,
  rating: {
    score: 9.0,
    level: `Awesome`,
    count: 250,
  },
  director: `Bryan Singer`,
  actors: `Rami Malek, Lucy Boynton, Gwilym Lee, Ben Hardy, Joe Mazzello, Aidan Gillen, Tom Hollander`,
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
