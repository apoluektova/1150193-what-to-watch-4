import {extend} from "../../utils.js";
import {ALL_GENRES} from "../../const.js";

const MovieCards = {
  SHOWN: 8,
  BY_BUTTON: 8,
};

const initialState = {
  genre: ALL_GENRES,
  shownMovieCards: MovieCards.SHOWN,
  currentMovieCard: null,
  isFullScreenOn: false,
  isReviewOpen: false,
  isFormDisabled: false,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWN_MOVIE_CARDS_COUNT: `RESET_SHOWN_MOVIE_CARDS_COUNT`,
  CHANGE_MOVIE_CARD: `CHANGE_MOVIE_CARD`,
  TOGGLE_FULL_SCREEN_PLAYER: `TOGGLE_FULL_SCREEN_PLAYER`,
  ADD_REVIEW: `ADD_REVIEW`,
  TOGGLE_FORM_STATE: `TOGGLE_FORM_STATE`,
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
  toggleFullScreenPlayer: (flag) => ({
    type: ActionType.TOGGLE_FULL_SCREEN_PLAYER,
    payload: flag,
  }),
  addReview: (bool) => ({
    type: ActionType.ADD_REVIEW,
    payload: bool,
  }),
  toggleFormState: (bool) => ({
    type: ActionType.TOGGLE_FORM_STATE,
    payload: bool,
  })
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
    case (ActionType.TOGGLE_FULL_SCREEN_PLAYER):
      return extend(state, {
        isFullScreenOn: action.payload,
      });
    case (ActionType.ADD_REVIEW):
      return extend(state, {
        isReviewOpen: action.payload,
      });
    case (ActionType.TOGGLE_FORM_STATE):
      return extend(state, {
        isFormDisabled: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
