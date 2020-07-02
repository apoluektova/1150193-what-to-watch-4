import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const review = {
  id: 1,
  text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  author: `Kate Muir`,
  date: `December 24, 2016`,
  rating: 8.9,
};


it(`Review should render correctly`, () => {
  const tree = renderer
     .create(<Review
       review={review}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
