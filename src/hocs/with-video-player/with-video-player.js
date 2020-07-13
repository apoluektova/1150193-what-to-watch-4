import React, {PureComponent} from "react";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
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
