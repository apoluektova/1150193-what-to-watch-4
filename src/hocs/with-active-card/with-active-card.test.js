import React from "react";
import renderer from "react-test-renderer";
import withActiveCard from "./with-active-card.js";

const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const MockComponentWrapped = withActiveCard(MockComponent);

it(`withActiveCard should render correctly`, () => {
  const tree = renderer
     .create(<MockComponentWrapped
       activeCard={{}}
       onActiveCardChange={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

