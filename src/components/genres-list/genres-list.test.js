import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const genresList = [`All genres`, `Drama`, `Comedy`, `Thriller`];

it(`Genre should render correctly`, () => {
  const tree = renderer
     .create(<GenresList
       onGenreClick={() => {}}
       activeGenre={genresList[0]}
       genresList={genresList}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
