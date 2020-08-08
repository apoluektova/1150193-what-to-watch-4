import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isPlaying: boolean;
}

interface InjectingProps {
  isPlaying: boolean;
  onVideoPlay: () => void;
  onVideoStop: () => void;
}

const withVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithVideoPlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleVideoPlay = this._handleVideoPlay.bind(this);
      this._handleVideoStop = this._handleVideoStop.bind(this);
    }

    _handleVideoPlay() {
      this.setState({
        isPlaying: true,
      });
    }

    _handleVideoStop() {
      this.setState({
        isPlaying: false,
      });
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onVideoPlay={this._handleVideoPlay}
          onVideoStop={this._handleVideoStop}
        />
      );
    }
  }

  return WithVideoPlayer;
};

export default withVideoPlayer;
