import {extend} from "./utils.js";
import {PROMO_MOVIE, movies} from "./mocks/movies.js";
import {reviews} from "./mocks/reviews.js";
import {ALL_GENRES} from "./const.js";

const MovieCards = {
  SHOWN: 8,
  BY_BUTTON: 8,
};

const initialState = {
  genre: ALL_GENRES,
  promoMovie: PROMO_MOVIE,
  movies,
  reviews,
  shownMovieCards: MovieCards.SHOWN,
  currentMovieCard: null,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWN_MOVIE_CARDS_COUNT: `RESET_SHOWN_MOVIE_CARDS_COUNT`,
  CHANGE_MOVIE_CARD: `CHANGE_MOVIE_CARD`,
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
  resetShownMovieCardsCount: () => ({
    type: ActionType.RESET_SHOWN_MOVIE_CARDS_COUNT,
    payload: MovieCards.SHOWN,
  }),
  changeMovieCard: (movie) => ({
    type: ActionType.CHANGE_MOVIE_CARD,
    payload: movie,
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
    case (ActionType.RESET_SHOWN_MOVIE_CARDS_COUNT):
      return extend(state, {
        shownMovieCards: action.payload,
      });
    case (ActionType.CHANGE_MOVIE_CARD):
      return extend(state, {
        currentMovieCard: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
