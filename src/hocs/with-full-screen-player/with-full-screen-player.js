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
      const {isPlaying, progress, duration, timeElapsed} = this.state;
      const {onExitButtonClick} = this.props;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          timeElapsed={timeElapsed}
          onPlayButtonClick={() => {
            this._handlePlayButtonClick();
          }}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
          onExitButtonClick={onExitButtonClick}
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
      previewImage: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
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
      }).isRequired,
      director: PropTypes.string.isRequired,
      actors: PropTypes.string.isRequired,
      runtime: PropTypes.string.isRequired,
    }).isRequired,
    onExitButtonClick: PropTypes.func.isRequired,
  };

  return WithFullScreenPlayer;
};

export default withFullScreenPlayer;


