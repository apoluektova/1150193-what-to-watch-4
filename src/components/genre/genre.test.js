import React from "react";
import renderer from "react-test-renderer";
import Genre from "./genre.jsx";

const genresList = [`All genres`, `Drama`, `Comedy`, `Thriller`];

it(`Genre should render correctly`, () => {
  const tree = renderer
     .create(<Genre
       genreName={genresList[0]}
       onGenreClick={() => {}}
       activeGenre={genresList[0]}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
