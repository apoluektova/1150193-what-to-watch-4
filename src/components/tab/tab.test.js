import React from "react";
import renderer from "react-test-renderer";
import Tab from "./tab.jsx";

const tabTitles = [`Overview`, `Details`, `Reviews`];

it(`Tab should render correctly`, () => {
  const tree = renderer
     .create(<Tab
       tabTitle={tabTitles[0]}
       onTabClick={() => {}}
       activeTab={tabTitles[0]}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
