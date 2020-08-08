import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab";
import {noop} from "../../utils";

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
       onTabClick={noop}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

