import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const genres = [`All genres`, `Drama`, `Comedy`, `Thriller`];

it(`Genre should render correctly`, () => {
  const store = mockStore({
    activeGenre: genres[0],
    genresList: genres,
  });

  const tree = renderer
     .create(
         <Provider store={store}>
           <GenresList
             onGenreClick={() => {}}
             activeGenre={genres[0]}
             genresList={genres}
           />
         </Provider>)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
