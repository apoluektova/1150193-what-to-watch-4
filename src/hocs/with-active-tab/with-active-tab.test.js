import React from "react";
import renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab.js";

const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const MockComponentWrapped = withActiveTab(MockComponent);

it(`withActiveTab should render correctly`, () => {
  const tree = renderer
     .create(<MockComponentWrapped
       activeTab={`Overview`}
       onTabClick={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

