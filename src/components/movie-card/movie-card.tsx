import * as React from "react";
import VideoPlayer from "../video-player/video-player";
import history from "../../history";
import {AppRoute} from "../../const";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
  onMovieCardHover: (movie: Movie) => void;
  onMovieCardClick: (movie: Movie) => void;
  isPlaying: boolean;
  onVideoPlay: () => void;
  onVideoStop: () => void;
};

const TIMEOUT_DELAY = 1000;

class MovieCard extends React.PureComponent<Props, {}> {
  private timeoutId: number | null;

  constructor(props) {
    super(props);

    this.timeoutId = null;

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  _handleMouseEnter() {
    const {onMovieCardHover, movie, onVideoPlay} = this.props;

    onMovieCardHover(movie);
    clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(onVideoPlay, TIMEOUT_DELAY);
  }

  _handleMouseLeave() {
    const {onVideoStop} = this.props;

    clearTimeout(this.timeoutId);
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
}

export default MovieCard;
