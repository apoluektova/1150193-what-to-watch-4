import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const TIMEOUT_DELAY = 1000;

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timeout = null;

    // this._handleMoviecardElementClick = this._handleMoviecardElementClick.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  // _handleMoviecardElementClick(evt) {
  //   const {onMovieCardClick, movie} = this.props;

  //   evt.preventDefault();
  //   onMovieCardClick(movie);
  // }

  _handleMouseEnter() {
    const {onMovieCardHover, movie, onVideoPlay} = this.props;

    onMovieCardHover(movie);
    clearTimeout(this._timeout);
    this._timeout = setTimeout(onVideoPlay, TIMEOUT_DELAY);
  }

  _handleMouseLeave() {
    const {onVideoStop} = this.props;

    clearTimeout(this._timeout);
    onVideoStop();
  }

  render() {
    const {movie, isPlaying, onMovieCardClick} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <div
          className="small-movie-card__image"
          onClick={() => {
            onMovieCardClick(movie);
            history.push(`${AppRoute.MOVIE}/${movie.id}`);
          }}>
          <VideoPlayer
            isPlaying={isPlaying}
            poster={movie.previewImage}
            src={movie.previewVideo}
            muted={true}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a
            onClick={(evt) => {
              evt.preventDefault();
              onMovieCardClick(movie);
              history.push(`${AppRoute.MOVIE}/${movie.id}`);
            }}
            className="small-movie-card__link"
            href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onVideoPlay: PropTypes.func.isRequired,
  onVideoStop: PropTypes.func.isRequired,
};

export default MovieCard;
