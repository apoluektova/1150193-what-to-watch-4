import {extend} from "../../utils";
import {ALL_GENRES} from "../../const";

const MovieCards = {
  SHOWN: 8,
  BY_BUTTON: 8,
};

const initialState = {
  genre: ALL_GENRES,
  shownMovieCards: MovieCards.SHOWN,
  currentMovieCard: null,
  isFormDisabled: false,
  isLoading: true,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWN_MOVIE_CARDS_COUNT: `RESET_SHOWN_MOVIE_CARDS_COUNT`,
  CHANGE_MOVIE_CARD: `CHANGE_MOVIE_CARD`,
  TOGGLE_FORM_STATE: `TOGGLE_FORM_STATE`,
  TOGGLE_LOADING_STATE: `TOGGLE_LOADING_STATE`,
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
  toggleFormState: (bool) => ({
    type: ActionType.TOGGLE_FORM_STATE,
    payload: bool,
  }),
  toggleLoadingState: (bool) => ({
    type: ActionType.TOGGLE_LOADING_STATE,
    payload: bool,
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
    case (ActionType.TOGGLE_FORM_STATE):
      return extend(state, {
        isFormDisabled: action.payload,
      });
    case (ActionType.TOGGLE_LOADING_STATE):
      return extend(state, {
        isLoading: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
