import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const {previewVideo, previewImage} = this.props;
    const video = this._videoRef.current;

    video.src = previewVideo;
    video.poster = previewImage;
    video.play();

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.poster = ``;
    video.onplay = null;
  }

  render() {
    return (
      <video
        className="player__video"
        width="280"
        height="175"
        muted
        ref={this._videoRef}
      />
    );
  }
}

VideoPlayer.propTypes = {
  previewVideo: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

