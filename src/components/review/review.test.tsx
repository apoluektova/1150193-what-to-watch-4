import * as React from "react";
import * as renderer from "react-test-renderer";
import Review from "./review";
import {ReviewInfo} from "../../types";

const review: ReviewInfo = {
  id: 2,
  user: {
    id: 2,
    name: `Bill Goodykoontz`,
  },
  comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
  date: `2020-07-19T16:06:01.831Z`,
  rating: 8.0,
};


it(`Review should render correctly`, () => {
  const tree = renderer
     .create(<Review
       review={review}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
