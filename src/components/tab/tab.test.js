import React from "react";
import renderer from "react-test-renderer";
import Tab from "./tab.jsx";

const tabTitles = [`Overview`, `Details`, `Reviews`];

it(`Tab should render correctly`, () => {
  const tree = renderer
     .create(<Tab
       tabTitle={tabTitles[0]}
       onClick={() => {}}
       activeTab={true}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
