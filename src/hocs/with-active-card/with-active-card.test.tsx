import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveCard from "./with-active-card";
import {noop} from "../../utils";

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
       onActiveCardChange={noop}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

