import * as React from "react";
import {Redirect, Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import FullScreenPlayer from "../full-screen-player/full-screen-player";
import withFullScreenPlayer from "../../hocs/with-full-screen-player/with-full-screen-player";
import {getPromoMovie, getMovies, getFavoriteMovies} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import ErrorMessage from "../error-message/error-message";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus, getAuthorizationInfo, getIsSignInError} from "../../reducer/user/selectors";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import AddReview from "../add-review/add-review";
import withReview from "../../hocs/with-review/with-review";
import PrivateRoute from "../private-route/private-route";
import history from "../../history";
import {AppRoute} from "../../const";
import MyList from "../my-list/my-list";
import withActiveCard from "../../hocs/with-active-card/with-active-card";
import {getIsLoading} from "../../reducer/app/selectors";
import Loader from "../loader/loader";
import {Movie, AuthInfo, ReviewInfo} from "../../types";

interface Props {
  promoMovie: Movie;
  currentMovieCard: Movie;
  onMovieCardClick: () => void;
  authorizationStatus: string;
  login: (authData: {
    login: string;
    password: string;
  }) => void;
  authInfo: AuthInfo;
  isSignInError: boolean;
  onReviewSubmit: (movieId: number, review: ReviewInfo) => void;
  movies: Array<Movie>;
  favoriteMovies: Array<Movie>;
  addMovieToFavorites: () => void,
  isLoading: boolean,
};

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);
const AddReviewWrapped = withReview(AddReview);
const MyListWrapped = withActiveCard(MyList);

const getCurrentMovieCard = (movies, params) => {
  return movies.find((movie) => movie.id === parseInt(params, 10));
};

const App: React.FunctionComponent<Props> = (props: Props) => {
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
  } = props;

  if (movies.length === 0) {
    return <Loader />;
  }

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
          render={(routeProps) => {
            const currentMovieCard = getCurrentMovieCard(movies, routeProps.match.params.id);

            return (
              isLoading ? <Loader /> :
                <MoviePage
                  routeProps={routeProps}
                  movie={currentMovieCard}
                  onMovieCardClick={onMovieCardClick}
                />
            );
          }}
        />
        <Route
          exact
          path={`${AppRoute.PLAYER}/:id/`}
          render={(routeProps) => {
            const currentMovieCard = getCurrentMovieCard(movies, routeProps.match.params.id);

            return (
              isLoading ? <Loader /> :
                <FullScreenPlayerWrapped
                  {...routeProps}
                  movie={currentMovieCard ? currentMovieCard : promoMovie}
                />
            );
          }}
        />
        <PrivateRoute
          exact
          path={`${AppRoute.MOVIE}/:id/review`}
          render={(routeProps) => {
            const currentMovieCard = getCurrentMovieCard(movies, routeProps.match.params.id);

            return (
              isLoading ? <Loader /> :
                <AddReviewWrapped
                  {...routeProps}
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
          render={(routeProps) => {
            return (
              <MyListWrapped
                {...routeProps}
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
