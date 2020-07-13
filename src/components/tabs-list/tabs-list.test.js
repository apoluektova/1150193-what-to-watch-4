import React from "react";
import renderer from "react-test-renderer";
import TabsList from "./tabs-list.jsx";

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
