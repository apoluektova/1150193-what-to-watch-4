import NameSpace from "../name-space.js";

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

