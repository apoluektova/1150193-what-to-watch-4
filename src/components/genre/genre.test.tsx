import * as React from "react";
import * as renderer from "react-test-renderer";
import Genre from "./genre";
import {noop} from "../../utils";

const genresList = [`All genres`, `Drama`, `Comedy`, `Thriller`];

it(`Genre should render correctly`, () => {
  const tree = renderer
     .create(<Genre
       genreName={genresList[0]}
       onGenreClick={noop}
       activeGenre={genresList[0]}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
