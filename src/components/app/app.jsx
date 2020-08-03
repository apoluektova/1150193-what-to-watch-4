import React, {PureComponent} from "react";
import {Redirect, Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenPlayer from "../full-screen-player/full-screen-player.jsx";
import withFullScreenPlayer from "../../hocs/with-full-screen-player/with-full-screen-player.js";
import {getPromoMovie, getIsError, getMovies} from "../../reducer/data/selectors.js";
import {getIsFullScreenOn} from "../../reducer/app/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import ErrorMessage from "../error-message/error-message.jsx";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getAuthorizationInfo, getIsSignedIn, getIsSignInError} from "../../reducer/user/selectors.js";
import SignInScreen from "../sign-in-screen/sign-in-screen.jsx";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";
import AddReview from "../add-review/add-review.jsx";
import withReview from "../../hocs/with-review/with-review.js";
import PrivateRoute from "../private-route/private-route.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);
const AddReviewWrapped = withReview(AddReview);

const getCurrentMovieCard = (movies, params) => {
  return movies.find((movie) => movie.id === parseInt(params, 10));
};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  // _renderApp() {
  //   const {
  //     currentMovieCard,
  //     isError
  //   } = this.props;

  //   if (isError && !currentMovieCard) {
  //     return (
  //       <ErrorMessage />
  //     );
  //   }
  // }

  render() {
    const {
      onMovieCardClick,
      handlePlayButtonClick,
      login,
      isSignInError,
      authorizationStatus,
      authInfo,
      onSignInClick,
      onReviewSubmit,
      promoMovie,
      handleExitButtonClick,
      movies
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={AppRoute.MAIN}
            render={() => {
              return (
                <Main
                  authorizationStatus={authorizationStatus}
                  promoMovie={promoMovie}
                  onMovieCardClick={onMovieCardClick}
                  onPlayButtonClick={handlePlayButtonClick}
                  authInfo={authInfo}
                  onSignInClick={onSignInClick}
                />
              );
            }}
          />
          <Route
            exact
            path={AppRoute.SIGN_IN}
            render={() => {
              return (
                authorizationStatus === AuthorizationStatus.AUTH ?
                  <Redirect to={AppRoute.MAIN} /> :
                  <SignInScreen
                    onSubmit={login}
                    isSignInError={isSignInError}
                  />
              );
            }}
          />
          <Route
            exact
            path={`${AppRoute.MOVIE}/:id`}
            render={(props) => {
              const currentMovieCard = getCurrentMovieCard(movies, props.match.params.id);

              return (
                <MoviePage
                  {...props}
                  movie={currentMovieCard}
                  onMovieCardClick={onMovieCardClick}
                  onPlayButtonClick={handlePlayButtonClick}
                />
              );
            }}
          />
          <Route
            exact
            path={`${AppRoute.PLAYER}/:id/`}
            render={(props) => {
              const currentMovieCard = getCurrentMovieCard(movies, props.match.params.id);
              
              return (
                <FullScreenPlayerWrapped
                  {...props}
                  movie={currentMovieCard ? currentMovieCard : promoMovie}
                  onExitButtonClick={handleExitButtonClick}
                />
              );
            }}
          />
          <PrivateRoute
            exact
            path={`${AppRoute.MOVIE}/:id/review`}
            render={(props) => {
              return (
                <AddReviewWrapped
                  {...props}
                  authorizationStatus={authorizationStatus}
                  authInfo={authInfo}
                  onSignInClick={onSignInClick}
                  movie={promoMovie}
                  onReviewSubmit={onReviewSubmit}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  promoMovie: PropTypes.shape({
    id: PropTypes.number,
    previewImage: PropTypes.string,
    previewVideo: PropTypes.string,
    videoLink: PropTypes.string,
    title: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    poster: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
    description: PropTypes.string,
    rating: PropTypes.shape({
      score: PropTypes.number,
      count: PropTypes.number,
    }),
    director: PropTypes.string,
    actors: PropTypes.array,
    runtime: PropTypes.number,
    isFavorite: PropTypes.bool,
  }).isRequired,
  currentMovieCard: PropTypes.object,
  onMovieCardClick: PropTypes.func.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
  handleExitButtonClick: PropTypes.func.isRequired,
  isFullScreenOn: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  authInfo: PropTypes.object.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  isSignInError: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  isFullScreenOn: getIsFullScreenOn(state),
  isError: getIsError(state),
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
  isSignedIn: getIsSignedIn(state),
  isSignInError: getIsSignInError(state),
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie) {
    dispatch(ActionCreator.changeMovieCard(movie));
    dispatch(DataOperation.loadReviews(movie.id));
  },
  handlePlayButtonClick() {
    dispatch(ActionCreator.toggleFullScreenPlayer(true));
  },
  handleExitButtonClick() {
    dispatch(ActionCreator.toggleFullScreenPlayer(false));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSignInClick() {
    dispatch(UserActionCreator.signIn(true));
  },
  onReviewSubmit(movieId, review) {
    dispatch(DataOperation.postReview(movieId, review));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
