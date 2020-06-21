import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null,
    };
  }

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
        backgroundImage: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        releaseDate: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        rating: PropTypes.exact({
          score: PropTypes.number.isRequired,
          level: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
        }),
        director: PropTypes.string.isRequired,
        actors: PropTypes.string.isRequired,
      })).isRequired,
  onMovieCardTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
