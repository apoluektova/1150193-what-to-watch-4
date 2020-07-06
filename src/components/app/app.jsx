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

    this.state = {
      currentMovieCard: null,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(currentMovieCard) {
    this.setState({currentMovieCard});
  }

  _renderApp() {
    const {promoMovie, movies, reviews, onGenreClick, activeGenre, genresList} = this.props;
    const {currentMovieCard} = this.state;

    if (currentMovieCard) {
      return <MoviePage movies={movies} movie={currentMovieCard} reviews={reviews} onMovieCardClick={this._handleMovieCardClick} />;
    }

    return (
      <Main
        promoMovie={promoMovie}
        movies={movies}
        genresList={genresList}
        onMovieCardClick={this._handleMovieCardClick}
        onGenreClick={onGenreClick}
        activeGenre={activeGenre}
      />
    );
  }

  render() {
    const {reviews, movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={this.state.currentMovieCard === null ? this.props.movies[0] : this.state.currentMovieCard}
              reviews={reviews}
              movies={movies}
              onMovieCardClick={this._handleMovieCardClick}
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
  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
  genresList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: state.promoMovie,
  movies: state.movies,
  reviews: state.reviews,
  activeGenre: state.genre,
  genresList: state.genresList,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
