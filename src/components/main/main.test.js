import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const PROMO_MOVIE = {
  title: `Harry Potter`,
  genre: `Comedy`,
  releaseDate: 2009,
};

const movies = [
  {
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Fantasy`,
    releaseDate: 2018,
    description: `The plot follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.`,
    rating: {
      score: 8.9,
      level: `Very good`,
      count: 240,
    },
    director: `David Yates`,
    actors: `Eddie Redmayne, Katherine Waterston, Dan Fogler, Alison Sudol, Ezra Miller, Zoë Kravitz`,
    runtime: `1h 39m`,
  },
  {
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
  },
];

const genresList = [`All genres`, `Drama`, `Comedy`, `Thriller`];

it(`Main renders correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    movies,
  });

  const tree = renderer
     .create(<Provider store={store}>
       <Main
         promoMovie={PROMO_MOVIE}
         movies={movies}
         onMovieCardClick={() => {}}
         onGenreClick={() => {}}
         activeGenre={`All genres`}
         genresList={genresList}
       />
     </Provider>, {
       createNodeMock: () => {
         return {};
       }
     })
     .toJSON();

  expect(tree).toMatchSnapshot();
});
