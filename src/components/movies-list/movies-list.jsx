import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";

const MovieCardWrapped = withVideoPlayer(MovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, onMovieCardClick, onActiveCardChange} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => {
          return (
            <MovieCardWrapped
              key={movie.title + index}
              movie={movie}
              onMovieCardClick={onMovieCardClick}
              onMovieCardHover={onActiveCardChange}
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
  onActiveCardChange: PropTypes.func.isRequired,
};

export default MoviesList;


