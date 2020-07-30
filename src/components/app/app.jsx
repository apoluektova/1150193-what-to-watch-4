import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenPlayer from "../full-screen-player/full-screen-player.jsx";
import withFullScreenPlayer from "../../hocs/with-full-screen-player/with-full-screen-player.js";
import {getPromoMovie, getIsError} from "../../reducer/data/selectors.js";
import {getCurrentMovieCard, getIsFullScreenOn} from "../../reducer/app/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import ErrorMessage from "../error-message/error-message.jsx";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getAuthorizationInfo, getIsSignedIn, getIsSignInError} from "../../reducer/user/selectors.js";
import SignInScreen from "../sign-in-screen/sign-in-screen.jsx";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {
      authorizationStatus,
      promoMovie,
      currentMovieCard,
      handleMovieCardClick,
      isFullScreenOn,
      handlePlayButtonClick,
      handleExitButtonClick,
      isError,
      authInfo,
      login,
      onSignInClick,
      isSignedIn,
      isSignInError
    } = this.props;

    if (isError) {
      return (
        <ErrorMessage />
      );
    }

    if (currentMovieCard && !isFullScreenOn) {
      return (
        <MoviePage
          movie={currentMovieCard}
          onMovieCardClick={handleMovieCardClick}
          onPlayButtonClick={handlePlayButtonClick}
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
          onSignInClick={onSignInClick}
        />
      );
    }

    if (isFullScreenOn) {
      return (
        <FullScreenPlayerWrapped
          movie={currentMovieCard ? currentMovieCard : promoMovie}
          onExitButtonClick={handleExitButtonClick}
        />
      );
    }

    if (isSignedIn) {
      return (
        <SignInScreen
          onSubmit={login}
          isSignInError={isSignInError}
        />
      );
    }

    return (
      <Main
        authorizationStatus={authorizationStatus}
        promoMovie={promoMovie}
        onMovieCardClick={handleMovieCardClick}
        onPlayButtonClick={handlePlayButtonClick}
        authInfo={authInfo}
        onSignInClick={onSignInClick}
      />
    );
  }

  render() {
    const {
      currentMovieCard,
      handleMovieCardClick,
      handlePlayButtonClick,
      login,
      isSignInError
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={currentMovieCard}
              onMovieCardClick={handleMovieCardClick}
              onPlayButtonClick={handlePlayButtonClick}
            />
          </Route>
          <Route exact path="/login">
            <SignInScreen
              onSubmit={login}
              isSignInError={isSignInError}
            />
          </Route>
        </Switch>
      </BrowserRouter>
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
  handleMovieCardClick: PropTypes.func.isRequired,
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
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  currentMovieCard: getCurrentMovieCard(state),
  isFullScreenOn: getIsFullScreenOn(state),
  isError: getIsError(state),
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
  isSignedIn: getIsSignedIn(state),
  isSignInError: getIsSignInError(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieCardClick(movie) {
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
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
