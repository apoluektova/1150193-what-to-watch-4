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

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {
      promoMovie,
      currentMovieCard,
      handleMovieCardClick,
      isFullScreenOn,
      handlePlayButtonClick,
      handleExitButtonClick,
      isError
    } = this.props;

    if (isError) {
      return (
        <ErrorMessage />
      );
    }

    if (currentMovieCard && !isFullScreenOn) {
      return <MoviePage
        movie={currentMovieCard}
        onMovieCardClick={handleMovieCardClick}
        onPlayButtonClick={handlePlayButtonClick}
      />;
    }

    if (isFullScreenOn) {
      return (
        <FullScreenPlayerWrapped
          movie={currentMovieCard ? currentMovieCard : promoMovie}
          onExitButtonClick={handleExitButtonClick}
        />
      );
    }

    return (
      <Main
        promoMovie={promoMovie}
        onMovieCardClick={handleMovieCardClick}
        onPlayButtonClick={handlePlayButtonClick}
      />
    );
  }

  render() {
    const {currentMovieCard, handleMovieCardClick, handlePlayButtonClick} = this.props;

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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoMovie: PropTypes.exact({
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
  currentMovieCard: PropTypes.object,
  handleMovieCardClick: PropTypes.func.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
  handleExitButtonClick: PropTypes.func.isRequired,
  isFullScreenOn: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  currentMovieCard: getCurrentMovieCard(state),
  isFullScreenOn: getIsFullScreenOn(state),
  isError: getIsError(state),
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
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
