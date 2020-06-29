import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timeout = null;

    this.state = {
      isPlaying: false,
    };

    this._handleMoviecardElementClick = this._handleMoviecardElementClick.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _handleMoviecardElementClick(evt) {
    const {onMovieCardClick, movie} = this.props;

    evt.preventDefault();
    onMovieCardClick(movie);
  }

  _handleMouseEnter() {
    const {onMovieCardHover, movie} = this.props;

    onMovieCardHover(movie);

    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.setState({isPlaying: true});
    }, 1000);
  }

  _handleMouseLeave() {
    clearTimeout(this._timeout);
    this.setState({isPlaying: false});
  }

  render() {
    const {movie} = this.props;
    const {isPlaying} = this.state;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <div
          className="small-movie-card__image"
          onClick={this._handleMoviecardElementClick}>
          <VideoPlayer
            isPlaying={isPlaying}
            poster={movie.previewImage}
            src={movie.previewVideo}
            muted={true}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a
            onClick={this._handleMoviecardElementClick}
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
  }).isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MovieCard;
