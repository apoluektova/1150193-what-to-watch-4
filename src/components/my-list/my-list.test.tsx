import * as React from "react";
import * as renderer from "react-test-renderer";
import MyList from "./my-list";
import {Router} from "react-router-dom";
import history from "../../history";
import {Movie, AuthInfo} from "../../types";
import {noop} from "../../utils";

const movies: Array<Movie> = [
  {
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
  },
  {
    id: 2,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Bohemian Rhapsody`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49768198796_957c97bc00_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_50001660108_922f0950ea_z_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 2018,
    description: `A British-American venture, the film was produced by 20th Century Fox, Regency Enterprises, GK Films, and Queen Films, with Fox serving as distributor. The film follows the singer's life from the formation of the band up to their 1985 Live Aid performance at the original Wembley Stadium.`,
    rating: {
      score: 9.0,
      count: 250,
    },
    director: `Bryan Singer`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: 99,
    isFavorite: false,
  },
  {
    id: 3,
    previewImage: `img/macbeth.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
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
  },
];

const userInfo: AuthInfo = {
  id: 1,
  email: `ben@mail.ru`,
  name: `Ben`,
  avatarUrl: `/wtw/static/avatar/5.jpg`,
};

it(`MyList should render correctly`, () => {
  const tree = renderer
     .create(
         <Router history={history}>
           <MyList
             authorizationStatus={`AUTH`}
             authInfo={userInfo}
             favoriteMovies={movies}
             onMovieCardClick={noop}
             onActiveCardChange={noop}
           />
         </Router>, {
           createNodeMock: () => {
             return {};
           }
         })
     .toJSON();

  expect(tree).toMatchSnapshot();
});
