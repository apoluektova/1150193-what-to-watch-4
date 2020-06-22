import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';

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
    const {promoMovie, movies} = this.props;
    const {currentMovieCard} = this.state;

    if (currentMovieCard) {
      return <MovieDetails movie={currentMovieCard} />;
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
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-details">
            <MovieDetails
              movie={this.state.currentMovieCard === null ? this.props.movies[0] : this.state.currentMovieCard}
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
};

export default App;
