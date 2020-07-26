import NameSpace from "../name-space.js";
import {createSelector} from 'reselect';
import {ALL_GENRES, SIMILAR_MOVIES_COUNT} from "../../const.js";
import {getGenre, getCurrentMovieCard} from "../app/selectors.js";

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

export const getMoviesLikeThis = createSelector(
    getFilteredMovies,
    getCurrentMovieCard,
    (filteredMovies, currentMovieCard) => {
      return (filteredMovies
        .filter((movie) => movie.id !== currentMovieCard.id)
        .slice(0, SIMILAR_MOVIES_COUNT)
      );
    }
);
