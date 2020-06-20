import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null,
    };

    // this._handleMovieCardHover = this._handleMovieCardHover.bind(this);
  }

  // _handleMovieCardHover(movie) {
  //   this.setState({
  //     activeMovieCard: movie,
  //   });
  // }

  // _getMoviesList() {
  //   const {movies, onMovieCardTitleClick} = this.props;

  //   movies.map((movie, index) => {
  //     return (
  //       <MovieCard
  //         key={index}
  //         movie={movie}
  //         onMovieCardHover={this._handleMovieCardHover(movie)}
  //         onMovieCardTitleClick={onMovieCardTitleClick}
  //       />
  //     );
  //   });
  // }

  render() {
    const {movies, onMovieCardTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              movie={movie}
              onMovieCardHover={(currentMovie) => {
                this.setState({
                  activeMovieCard: currentMovie,
                });
              }}
              onMovieCardTitleClick={onMovieCardTitleClick}
            />
          );
        })}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.exact({
        previewImage: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })).isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
