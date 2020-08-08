import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMoreButton from "./show-more-button.jsx";

Enzyme.configure({
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
