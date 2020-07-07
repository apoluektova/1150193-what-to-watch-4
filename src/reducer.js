import {extend, getGenresList} from "./utils.js";
import {PROMO_MOVIE, movies} from "./mocks/movies.js";
import {reviews} from "./mocks/reviews.js";
import {ALL_GENRES} from "./const.js";

const MovieCards = {
  SHOWN: 8,
  BY_BUTTON: 8,
};

const initialState = {
  genre: ALL_GENRES,
  genresList: getGenresList(movies),
  promoMovie: PROMO_MOVIE,
  movies,
  reviews,
  shownMovieCards: MovieCards.SHOWN,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: MovieCards.BY_BUTTON,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case (ActionType.CHANGE_GENRE):
      return extend(state, {
        genre: action.payload,
      });

    case (ActionType.SHOW_MORE_MOVIES):
      return extend(state, {
        shownMovieCards: state.shownMovieCards + action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
