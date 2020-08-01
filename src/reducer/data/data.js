import {extend} from "../../utils.js";
import {createMovie, createMovies} from "../../adapter/movies.js";
import {ActionCreator as AppActionCreator} from "../app/app.js";

const initialState = {
  promoMovie: {},
  movies: [],
  reviews: [],
  isError: false,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CATCH_ERROR: `CATCH_ERROR`,
  POST_REVIEW: `POST_REVIEW`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  loadPromoMovie: (promoMovie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: promoMovie,
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  catchError: () => {
    return {
      type: ActionType.CATCH_ERROR,
      payload: true,
    };
  },
  postReview: (review) => {
    return {
      type: ActionType.POST_REVIEW,
      payload: review,
    };
  }
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.loadMovies(createMovies(response.data)));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError());
    });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {
      dispatch(ActionCreator.loadPromoMovie(createMovie(response.data)));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError());
    });
  },
  loadReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response.data));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError());
    });
  },
  postReview: (movieId, review) => (dispatch, getState, api) => {
    return api.post(`comments/${movieId}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.postReview(review));
      dispatch(AppActionCreator.toggleFormState(true));
      dispatch(Operation.loadReviews(movieId));
      dispatch(AppActionCreator.toggleFormState(false));
      dispatch(AppActionCreator.addReview(false));
    })
    .catch(() => {
      dispatch(ActionCreator.catchError());
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        isError: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator, initialState};

