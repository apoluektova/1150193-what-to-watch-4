import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Genre from "./genre";
import {noop} from "../../utils";

configure({
  adapter: new Adapter()
});

const mockEvent = {
  preventDefault() {
    noop();
  }
};

it(`Genre item should be clicked`, () => {
  const onGenreClick = jest.fn();

  const genre = shallow(
      <Genre
        genreName={`All genres`}
        onGenreClick={onGenreClick}
        activeGenre={`All genres`}
      />
  );

  const genreItem = genre.find(`.catalog__genres-link`);

  genreItem.simulate(`click`, mockEvent);
  expect(onGenreClick).toHaveBeenCalledTimes(1);
});
