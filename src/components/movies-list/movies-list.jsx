import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import {connect} from "react-redux";
import {ALL_GENRES} from "../../const.js";

const getMoviesListByGenre = (movies, genre) => movies.filter((movie) => movie.genre === genre);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null,
    };
  }

  render() {
    const {movies, onMovieCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key={movie.title + index}
              movie={movie}
              onMovieCardClick={onMovieCardClick}
              onMovieCardHover={(currentMovie) => {
                this.setState({
                  activeMovieCard: currentMovie,
                });
              }}
            />
          );
        })}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: (state.genre === ALL_GENRES) ? state.movies : getMoviesListByGenre(state.movies, state.genre),
});

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);

