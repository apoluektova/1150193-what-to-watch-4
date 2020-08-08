import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import ShowMoreButton from "./show-more-button";

configure({
  adapter: new Adapter(),
});

it(`Show More button should be clicked`, () => {
  const onButtonClick = jest.fn();

  const buttonComponent = mount(
      <ShowMoreButton
        onShowMoreButtonClick={onButtonClick}
      />
  );

  const showMoreButton = buttonComponent.find(`.catalog__button`);
  showMoreButton.simulate(`click`);

  expect(onButtonClick).toHaveBeenCalledTimes(1);
});
