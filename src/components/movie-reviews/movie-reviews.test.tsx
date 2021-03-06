import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews";
import {ReviewInfo} from "../../types";

const reviews: Array<ReviewInfo> = [
  {
    id: 1,
    user: {
      id: 1,
      name: `Kate Muir`,
    },
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2020-07-19T16:06:01.831Z`,
    rating: 8.9,
  },
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
];

it(`MovieReviews should render correctly`, () => {
  const tree = renderer
     .create(<MovieReviews
       reviews={reviews}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
