import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Tab from "./tab";
import {noop} from "../../utils";

const tabTitles = [`Overview`, `Details`, `Reviews`];

configure({
  adapter: new Adapter()
});

const mockEvent = {
  preventDefault() {
    noop();
  }
};

it(`Tab link should be clicked`, () => {
  const onTabClick = jest.fn();

  const tabItem = shallow(
      <Tab
        tabTitle={tabTitles[0]}
        onTabClick={onTabClick}
        activeTab={tabTitles[0]}
      />
  );

  const tabLink = tabItem.find(`.movie-nav__link`);

  tabLink.simulate(`click`, mockEvent);

  expect(onTabClick).toHaveBeenCalledTimes(1);
});
