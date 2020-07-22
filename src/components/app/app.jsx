import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenPlayer from "../full-screen-player/full-screen-player.jsx";
import withFullScreenPlayer from "../../hocs/with-full-screen-player/with-full-screen-player.js";

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {
      promoMovie,
      reviews,
      currentMovieCard,
      handleMovieCardClick,
      isFullScreenOn,
      handlePlayButtonClick,
      handleExitButtonClick
    } = this.props;

    if (currentMovieCard && !isFullScreenOn) {
      return <MoviePage
        movie={currentMovieCard}
        reviews={reviews}
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
    const {reviews, currentMovieCard, handleMovieCardClick, handlePlayButtonClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={currentMovieCard}
              reviews={reviews}
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
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
  currentMovieCard: PropTypes.object,
  handleMovieCardClick: PropTypes.func.isRequired,
  handlePlayButtonClick: PropTypes.func.isRequired,
  handleExitButtonClick: PropTypes.func.isRequired,
  isFullScreenOn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: state.promoMovie,
  reviews: state.reviews,
  currentMovieCard: state.currentMovieCard,
  isFullScreenOn: state.isFullScreenOn,
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieCardClick(movie) {
    dispatch(ActionCreator.changeMovieCard(movie));
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
