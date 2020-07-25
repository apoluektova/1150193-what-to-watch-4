import {extend} from "./utils.js";
import {PROMO_MOVIE, movies} from "./mocks/movies.js";
import {reviews} from "./mocks/reviews.js";

const initialState = {
  promoMovie: PROMO_MOVIE,
  movies,
  reviews,
};