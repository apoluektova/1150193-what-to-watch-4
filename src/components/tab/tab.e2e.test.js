import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tab from "./tab.jsx";

const tabTitles = [`Overview`, `Details`, `Reviews`];

Enzyme.configure({
  adapter: new Adapter()
});

const mockEvent = {
  preventDefault() {}
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
