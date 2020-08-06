import React, {PureComponent} from "react";
import {Redirect, Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenPlayer from "../full-screen-player/full-screen-player.jsx";
import withFullScreenPlayer from "../../hocs/with-full-screen-player/with-full-screen-player.js";
import {getPromoMovie, getMovies, getFavoriteMovies} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import ErrorMessage from "../error-message/error-message.jsx";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getAuthorizationInfo, getIsSignInError} from "../../reducer/user/selectors.js";
import SignInScreen from "../sign-in-screen/sign-in-screen.jsx";
import AddReview from "../add-review/add-review.jsx";
import withReview from "../../hocs/with-review/with-review.js";
import PrivateRoute from "../private-route/private-route.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import MyList from "../my-list/my-list.jsx";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import {getIsLoading} from "../../reducer/app/selectors.js";
import Loader from "../loader/loader.jsx";

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);
const AddReviewWrapped = withReview(AddReview);
const MyListWrapped = withActiveCard(MyList);

const getCurrentMovieCard = (movies, params) => {
  return movies.find((movie) => movie.id === parseInt(params, 10));
};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onMovieCardClick,
      login,
      isSignInError,
      authorizationStatus,
      authInfo,
      onReviewSubmit,
      promoMovie,
      movies,
      favoriteMovies,
      addMovieToFavorites,
      isLoading,
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={AppRoute.MAIN}
            render={() => {
              return (
                isLoading ? <Loader /> :
                  <Main
                    authorizationStatus={authorizationStatus}
                    promoMovie={promoMovie}
                    onMovieCardClick={onMovieCardClick}
                    authInfo={authInfo}
                    addMovieToFavorites={addMovieToFavorites}
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
                isLoading ? <Loader /> :
                  <MoviePage
                    props={props}
                    movie={currentMovieCard}
                    onMovieCardClick={onMovieCardClick}
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
                isLoading ? <Loader /> :
                  <FullScreenPlayerWrapped
                    {...props}
                    movie={currentMovieCard ? currentMovieCard : promoMovie}
                  />
              );
            }}
          />
          <PrivateRoute
            exact
            path={`${AppRoute.MOVIE}/:id/review`}
            render={(props) => {
              const currentMovieCard = getCurrentMovieCard(movies, props.match.params.id);

              return (
                <AddReviewWrapped
                  {...props}
                  authorizationStatus={authorizationStatus}
                  authInfo={authInfo}
                  movie={currentMovieCard}
                  onReviewSubmit={onReviewSubmit}
                />
              );
            }}
          />
          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={(props) => {
              return (
                <MyListWrapped
                  {...props}
                  authorizationStatus={authorizationStatus}
                  authInfo={authInfo}
                  onMovieCardClick={onMovieCardClick}
                  favoriteMovies={favoriteMovies}
                />
              );
            }}
          />
          <Route component={ErrorMessage}
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
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  authInfo: PropTypes.object.isRequired,
  isSignInError: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  addMovieToFavorites: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
  isSignInError: getIsSignInError(state),
  movies: getMovies(state),
  favoriteMovies: getFavoriteMovies(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie) {
    dispatch(ActionCreator.changeMovieCard(movie));
    dispatch(DataOperation.loadReviews(movie.id));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onReviewSubmit(movieId, review) {
    dispatch(DataOperation.postReview(movieId, review));
  },
  addMovieToFavorites(movie) {
    dispatch(DataOperation.addMovieToFavorites(movie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
