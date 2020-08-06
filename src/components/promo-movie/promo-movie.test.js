import React from "react";
import renderer from "react-test-renderer";
import PromoMovie from "./promo-movie.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const PROMO_MOVIE = {
  id: 1,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `The Grand Budapest Hotel`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#A6B7AC`,
  poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2014,
  description: `The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson, which explores tragedy, war, fascism, nostalgia, friendship, and loyalty.`,
  rating: {
    score: 9.3,
    count: 250,
  },
  director: `Wes Anderson`,
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: 99,
  isFavorite: false,
};

const userInfo = {
  id: 1,
  email: `ben@mail.ru`,
  name: `Ben`,
  avatarUrl: `/wtw/static/avatar/5.jpg`,
};

it(`PromoMovie should render correctly`, () => {
  const tree = renderer
     .create(
         <Router history={history}>
           <PromoMovie
             promoMovie={PROMO_MOVIE}
             authorizationStatus={`AUTH`}
             authInfo={userInfo}
             addMovieToFavorites={() => {}}
           />
         </Router>, {
           createNodeMock: () => {
             return {};
           }
         }).toJSON();

  expect(tree).toMatchSnapshot();
});
