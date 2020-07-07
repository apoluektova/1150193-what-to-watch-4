import {ALL_GENRES} from "./const.js";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGenresList = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
};


