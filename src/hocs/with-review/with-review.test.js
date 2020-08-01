import React from "react";
import renderer from "react-test-renderer";
import withReview from "./with-review.js";

const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const MockComponentWrapped = withReview(MockComponent);

it(`withReview should render correctly`, () => {
  const tree = renderer
     .create(<MockComponentWrapped
       onRatingChange={() => {}}
       onReviewChange={() => {}}
       onReviewFormSubmit={() => {}}
       isSubmitButtonDisabled={false}
       onReviewSubmit={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

