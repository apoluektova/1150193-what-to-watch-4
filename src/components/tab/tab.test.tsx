import * as React from "react";
import * as renderer from "react-test-renderer";
import Tab from "./tab";
import {noop} from "../../utils";

const tabTitles = [`Overview`, `Details`, `Reviews`];

it(`Tab should render correctly`, () => {
  const tree = renderer
     .create(<Tab
       tabTitle={tabTitles[0]}
       onTabClick={noop}
       activeTab={tabTitles[0]}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
