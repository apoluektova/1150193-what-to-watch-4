import {extend, getGenresList} from "./utils.js";
import {PROMO_MOVIE, movies} from "./mocks/movies.js";
import {reviews} from "./mocks/reviews.js";
import {ALL_GENRES} from "./const.js";

const getMoviesListByGenre = (genre) => movies.filter((movie) => movie.genre === genre);

const initialState = {
  genre: ALL_GENRES,
  genresList: getGenresList(movies),
  promoMovie: PROMO_MOVIE,
  movies,
  reviews
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  getMoviesByGenre: (genre) => {
    const moviesByGenre = (genre === ALL_GENRES) ? movies : getMoviesListByGenre(genre);

    return {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: moviesByGenre,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case (ActionType.CHANGE_GENRE):
      return extend(state, {
        genre: action.payload,
      });

    case (ActionType.GET_MOVIES_BY_GENRE):
      return extend(state, {
        movies: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
