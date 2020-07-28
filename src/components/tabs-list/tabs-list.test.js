import React from "react";
import renderer from "react-test-renderer";
import TabsList from "./tabs-list.jsx";

const movie = {
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

const reviews = [
  {
    id: 2,
    user: {
      id: 2,
      name: `Bill Goodykoontz`,
    },
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: `2020-07-19T16:06:01.831Z`,
    rating: 8.0,
  },
  {
    id: 3,
    user: {
      id: 3,
      name: `Bill`,
    },
    comment: `Anderson's films are too precious for some`,
    date: `2020-07-19T16:06:01.831Z`,
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
