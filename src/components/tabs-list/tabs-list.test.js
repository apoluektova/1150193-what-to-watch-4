import React from "react";
import renderer from "react-test-renderer";
import TabsList from "./tabs-list.jsx";

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
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: `1h 39m`,
};

const reviews = [
  {
    id: 1,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    author: `Kate Muir`,
    date: `December 24, 2016`,
    rating: 8.9,
  },
  {
    id: 2,
    text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    author: `Bill Goodykoontz`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
];


it(`TabsList should render correctly`, () => {
  const tree = renderer
     .create(<TabsList
       movie={movie}
       reviews={reviews}
       activeTab={`Overview`}
       onTabClick={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
