import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const withFullScreenPlayer = (Component) => {
  class WithFullScreenPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        progress: 0,
        duration: 0,
      };

      this._videoRef = createRef();

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;
      const {movie} = this.props;

      video.src = movie.videoLink;
      video.poster = movie.backgroundImage;
      video.play();

      video.oncanplaythrough = () => {
        this.setState({
          duration: video.duration,
        });
      };

      video.onloadedmetadata = () => this.setState({
        duration: Math.floor(video.duration)
      });

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => {
        this.setState({
          isPlaying: false,
        });
      };

      video.ontimeupdate = () => {
        this.setState({
          progress: Math.floor(video.currentTime)
        });
      };
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.src = ``;
      video.poster = ``;

      video.oncanplaythrough = null;
      video.onloadedmetadata = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    _handlePlayButtonClick() {
      return this.setState({isPlaying: !this.state.isPlaying});
    }

    _handleFullScreenButtonClick() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    render() {
      const {isPlaying, progress, duration} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onPlayButtonClick={() => {
            this._handlePlayButtonClick();
          }}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
        >
          <video
            className="player__video"
            ref={this._videoRef}
          />
        </Component>
      );
    }
  }

  WithFullScreenPlayer.propTypes = {
    movie: PropTypes.exact({
      id: PropTypes.number,
      previewImage: PropTypes.string,
      previewVideo: PropTypes.string,
      videoLink: PropTypes.string,
      title: PropTypes.string,
      backgroundImage: PropTypes.string,
      backgroundColor: PropTypes.string,
      poster: PropTypes.string,
      genre: PropTypes.string,
      releaseDate: PropTypes.number,
      description: PropTypes.string,
      rating: PropTypes.shape({
        score: PropTypes.number,
        count: PropTypes.number,
      }),
      director: PropTypes.string,
      actors: PropTypes.array,
      runtime: PropTypes.number,
      isFavorite: PropTypes.bool,
    }).isRequired,
  };

  return WithFullScreenPlayer;
};

export default withFullScreenPlayer;


