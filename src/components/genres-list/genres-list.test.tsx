import * as React from "react";
import * as renderer from "react-test-renderer";
import {GenresList} from "./genres-list";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space';
import {noop} from "../../utils";

const mockStore = configureStore([]);

const genres = [`All genres`, `Drama`, `Comedy`, `Thriller`];

it(`Genre should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      activeGenre: genres[0],
    },
    genresList: genres,
  });

  const tree = renderer
     .create(
         <Provider store={store}>
           <GenresList
             onGenreClick={noop}
             activeGenre={genres[0]}
             genresList={genres}
           />
         </Provider>)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
