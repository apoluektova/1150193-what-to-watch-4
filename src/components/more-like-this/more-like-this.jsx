import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {connect} from "react-redux";
import {getMovies} from "../../reducer/data/selectors.js";

const MovieCardWrapped = withVideoPlayer(MovieCard);

class MoreLikeThis extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, onMovieCardClick, onActiveCardChange} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => {
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
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
});

export {MoreLikeThis};
export default connect(mapStateToProps)(MoreLikeThis);
