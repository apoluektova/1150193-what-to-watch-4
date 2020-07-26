import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const review = {
  id: 2,
  user: {
    id: 2,
    name: `Bill Goodykoontz`,
  },
  comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
  date: `November 18, 2015`,
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
