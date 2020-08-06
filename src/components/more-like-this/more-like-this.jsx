import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {connect} from "react-redux";
import {getFilteredMovies} from "../../reducer/data/selectors.js";
import {SIMILAR_MOVIES_COUNT} from "../../const.js";

const MovieCardWrapped = withVideoPlayer(MovieCard);

const getMoviesLikeThis = (movies, currentMovieCard) => {
  return (movies
    .filter((movie) => movie.id !== currentMovieCard.id)
    .slice(0, SIMILAR_MOVIES_COUNT)
  );
};

class MoreLikeThis extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, onMovieCardClick, onActiveCardChange, currentMovieCard} = this.props;

    const moviesLikeThis = getMoviesLikeThis(movies, currentMovieCard);

    return (
      <div className="catalog__movies-list">
        {moviesLikeThis.map((movie) => {
          return (
            <MovieCardWrapped
              key={movie.id}
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

MoreLikeThis.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
  currentMovieCard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getFilteredMovies(state),
});


export {MoreLikeThis};
export default connect(mapStateToProps)(MoreLikeThis);
