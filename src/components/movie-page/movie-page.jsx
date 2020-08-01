import React from "react";
import PropTypes from "prop-types";
import TabsList from "../tabs-list/tabs-list.jsx";
import MoreLikeThis from "../more-like-this/more-like-this.jsx";
import Footer from "../footer/footer.jsx";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.js";
import {connect} from "react-redux";
import {getReviews, getMoviesLikeThis} from "../../reducer/data/selectors.js";
import Header from "../header/header.jsx";
import {ActionCreator as UserActionCreator, AuthorizationStatus} from "../../reducer/user/user.js";
import {getIsSignedIn, getIsSignInError} from "../../reducer/user/selectors.js";
import SignInScreen from "../sign-in-screen/sign-in-screen.jsx";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getIsReviewOpen} from "../../reducer/app/selectors.js";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import AddReview from "../add-review/add-review.jsx";
import withReview from "../../hocs/with-review/with-review.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

const MoreLikeThisWrapped = withActiveCard(MoreLikeThis);
const TabsListWrapped = withActiveTab(TabsList);
const AddReviewWrapped = withReview(AddReview);

const MoviePage = (props) => {
  const {
    movies,
    movie,
    reviews,
    onMovieCardClick,
    onPlayButtonClick,
    authInfo,
    authorizationStatus,
    onSignInClick,
    isSignedIn,
    login,
    isSignInError,
    isReviewOpen,
    onAddReviewClick,
    onReviewSubmit
  } = props;

  if (isSignedIn) {
    return (
      <SignInScreen
        onSubmit={login}
        isSignInError={isSignInError}
      />
    );
  }

  if (isReviewOpen) {
    return (
      <AddReviewWrapped
        authorizationStatus={authorizationStatus}
        authInfo={authInfo}
        onSignInClick={onSignInClick}
        movie={movie}
        onReviewSubmit={onReviewSubmit}
      />
    );
  }

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={{background: movie.backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            authorizationStatus={authorizationStatus}
            authInfo={authInfo}
            onSignInClick={onSignInClick}
          />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button onClick={onPlayButtonClick} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH &&
                <a
                  href="add-review.html"
                  className="btn movie-card__button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onAddReviewClick();
                  }}
                >Add review</a>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.poster} alt={`${movie.title} poster`} width="218" height="327" />
            </div>

            {<TabsListWrapped movie={movie} reviews={reviews} />}

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoreLikeThisWrapped
            movies={movies}
            onMovieCardClick={onMovieCardClick}
          />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = {
  movie: PropTypes.exact({
    id: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      score: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    runtime: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  authInfo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  isSignInError: PropTypes.bool.isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
  isReviewOpen: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isReqruied,
};

const mapStateToProps = (state) => ({
  movies: getMoviesLikeThis(state),
  reviews: getReviews(state),
  isSignedIn: getIsSignedIn(state),
  isSignInError: getIsSignInError(state),
  isReviewOpen: getIsReviewOpen(state),
});


const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSignInClick() {
    dispatch(UserActionCreator.signIn(true));
  },
  onAddReviewClick() {
    dispatch(AppActionCreator.addReview(true));
  },
  onReviewSubmit(movieId, review) {
    dispatch(DataOperation.postReview(movieId, review));
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
