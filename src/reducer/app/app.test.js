import {initialState, reducer, ActionType, ActionCreator} from "./app.js";
import {ALL_GENRES} from "../../const.js";

const movieCard =
  {
    id: 1,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49876816733_f1ba86707f_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
    genre: `Fantasy`,
    releaseDate: 2018,
    description: `The plot follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.`,
    rating: {
      score: 8.9,
      count: 240,
    },
    director: `David Yates`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  };

const Genres = {
  DRAMA: `Drama`,
  COMEDY: `Comedy`,
  THRILLER: `Thriller`,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change current genre`, () => {
  expect(reducer({
    genre: ALL_GENRES,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: Genres.DRAMA,
  })).toEqual({
    genre: Genres.DRAMA,
  });

  expect(reducer({
    genre: Genres.THRILLER
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: Genres.COMEDY,
  })).toEqual({
    genre: Genres.COMEDY,
  });
});

it(`Reducer should show more movie cards by button click`, () => {
  expect(reducer({
    shownMovieCards: 8,
  }, {
    type: ActionType.SHOW_MORE_MOVIES,
    payload: 8,
  })).toEqual({
    shownMovieCards: 16,
  });
});

it(`Reducer should reset shown movie cards count by genre change`, () => {
  expect(reducer({
    shownMovieCards: 16,
  }, {
    type: ActionType.RESET_SHOWN_MOVIE_CARDS_COUNT,
    payload: 8,
  })).toEqual({
    shownMovieCards: 8,
  });
});

it(`Reducer should change current movie card`, () => {
  expect(reducer({
    currentMovieCard: null,
  }, {
    type: ActionType.CHANGE_MOVIE_CARD,
    payload: movieCard,
  })).toEqual({
    currentMovieCard: movieCard,
  });
});

it(`Reducer should toggle form state`, () => {
  expect(reducer({
    isFormDisabled: false,
  }, {
    type: ActionType.TOGGLE_FORM_STATE,
    payload: true,
  })).toEqual({
    isFormDisabled: true,
  });
});

it(`Reducer should toggle loading state`, () => {
  expect(reducer({
    isLoading: false,
  }, {
    type: ActionType.TOGGLE_LOADING_STATE,
    payload: true,
  })).toEqual({
    isLoading: true,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct genre`, () => {
    expect(ActionCreator.changeGenre(Genres.COMEDY)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: Genres.COMEDY,
    });
  });
  it(`Action creator for showing more movie cards returns correct movie cards number`, () => {
    expect(ActionCreator.showMoreMovies()).toEqual({
      type: ActionType.SHOW_MORE_MOVIES,
      payload: 8,
    });
  });
  it(`Action creator for resetting shown movie cards number returns correct movie cards number`, () => {
    expect(ActionCreator.resetShownMovieCardsCount()).toEqual({
      type: ActionType.RESET_SHOWN_MOVIE_CARDS_COUNT,
      payload: 8,
    });
  });
  it(`Action creator for changing current movie card returns correct object`, () => {
    expect(ActionCreator.changeMovieCard(movieCard)).toEqual({
      type: ActionType.CHANGE_MOVIE_CARD,
      payload: movieCard,
    });
  });
  it(`Action creator for toggling form state returns correct state`, () => {
    expect(ActionCreator.toggleFormState(false)).toEqual({
      type: ActionType.TOGGLE_FORM_STATE,
      payload: false,
    });
  });
  it(`Action creator for toggling loading state returns correct state`, () => {
    expect(ActionCreator.toggleLoadingState(false)).toEqual({
      type: ActionType.TOGGLE_LOADING_STATE,
      payload: false,
    });
  });
});
