import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
    const {promoMovie, movies, reviews} = this.props;
    const {currentMovieCard} = this.state;

    if (currentMovieCard) {
      return <MoviePage movies={movies} movie={currentMovieCard} reviews={reviews} onMovieCardClick={this._handleMovieCardClick} />;
    }

    return (
      <Main
        promoMovie={promoMovie}
        movies={movies}
        onMovieCardClick={this._handleMovieCardClick}
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
};

export default App;
