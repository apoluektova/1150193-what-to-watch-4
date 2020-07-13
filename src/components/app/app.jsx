import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import {ALL_GENRES} from "../../const.js";

const getGenresList = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {
      promoMovie,
      movies,
      reviews,
      shownMovieCards,
      handleShowMoreButtonClick,
      currentMovieCard,
      handleMovieCardClick} = this.props;

    const genresList = getGenresList(movies);

    if (currentMovieCard) {
      return <MoviePage
        movies={movies}
        movie={currentMovieCard}
        reviews={reviews}
        onMovieCardClick={handleMovieCardClick}
      />;
    }

    return (
      <Main
        promoMovie={promoMovie}
        movies={movies}
        genresList={genresList}
        onMovieCardClick={handleMovieCardClick}
        handleShowMoreButtonClick={handleShowMoreButtonClick}
        shownMovieCards={shownMovieCards}
      />
    );
  }

  render() {
    const {reviews, movies, currentMovieCard, handleMovieCardClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={currentMovieCard === null ? this.props.movies[0] : currentMovieCard}
              reviews={reviews}
              movies={movies}
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
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  reviews: PropTypes.array.isRequired,
  shownMovieCards: PropTypes.number.isRequired,
  handleShowMoreButtonClick: PropTypes.func.isRequired,
  currentMovieCard: PropTypes.object,
  handleMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: state.promoMovie,
  movies: state.movies,
  reviews: state.reviews,
  shownMovieCards: state.shownMovieCards,
  currentMovieCard: state.currentMovieCard,
});

const mapDispatchToProps = (dispatch) => ({
  handleShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },
  handleMovieCardClick(movie) {
    dispatch(ActionCreator.changeMovieCard(movie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
