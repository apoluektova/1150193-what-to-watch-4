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
    const {movies, onMovieCardClick, shownMovieCards} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.slice(0, shownMovieCards).map((movie, index) => {
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
  shownMovieCards: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  movies: (state.genre === ALL_GENRES) ? state.movies : getMoviesListByGenre(state.movies, state.genre),
  shownMovieCards: state.shownMovieCards,
});

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);

