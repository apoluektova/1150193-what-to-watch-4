import NameSpace from "../name-space";
import {createSelector} from 'reselect';
import {ALL_GENRES} from "../../const";
import {getGenre} from "../app/selectors";

export const getMovies = (state) => {
  return state[NameSpace.DATA].movies;
};

export const getPromoMovie = (state) => {
  return state[NameSpace.DATA].promoMovie;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getIsError = (state) => {
  return state[NameSpace.DATA].isError;
};

export const getFavoriteMovies = (state) => {
  return state[NameSpace.DATA].favoriteMovies;
};

export const getIsReviewError = (state) => {
  return state[NameSpace.DATA].isReviewError;
};

export const getGenresList = createSelector(
    getMovies,
    (movies) => {
      return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
    }
);

export const getFilteredMovies = createSelector(
    getMovies,
    getGenre,
    (movies, genre) => {
      if (genre === ALL_GENRES) {
        return movies;
      } else {
        return movies.filter((movie) => movie.genre === genre);
      }
    }
);
