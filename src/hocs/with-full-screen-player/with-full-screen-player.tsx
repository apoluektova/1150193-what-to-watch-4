import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isPlaying: boolean;
  progress: number;
  duration: number;
}

interface InjectingProps {
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlayButtonClick: () => void;
  onFullScreenButtonClick: () => void;
}

const withFullScreenPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithFullScreenPlayer extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        progress: 0,
        duration: 0,
      };

      this.videoRef = React.createRef();

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
    }

    componentDidMount() {
      const video = this.videoRef.current;
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
      const video = this.videoRef.current;

      video.src = ``;
      video.poster = ``;

      video.oncanplaythrough = null;
      video.onloadedmetadata = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

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
      const video = this.videoRef.current;
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
            ref={this.videoRef}
          />
        </Component>
      );
    }
  }

  return WithFullScreenPlayer;
};

export default withFullScreenPlayer;


