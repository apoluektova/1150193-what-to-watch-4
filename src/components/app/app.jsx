import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {
      promoMovie,
      reviews,
      currentMovieCard,
      handleMovieCardClick} = this.props;

    if (currentMovieCard) {
      return <MoviePage
        movie={currentMovieCard}
        reviews={reviews}
        onMovieCardClick={handleMovieCardClick}
      />;
    }

    return (
      <Main
        promoMovie={promoMovie}
        onMovieCardClick={handleMovieCardClick}
      />
    );
  }

  render() {
    const {reviews, currentMovieCard, handleMovieCardClick} = this.props;

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
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoMovie: PropTypes.exact({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
  currentMovieCard: PropTypes.object,
  handleMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: state.promoMovie,
  reviews: state.reviews,
  currentMovieCard: state.currentMovieCard,
});

const mapDispatchToProps = (dispatch) => ({
  handleMovieCardClick(movie) {
    dispatch(ActionCreator.changeMovieCard(movie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
