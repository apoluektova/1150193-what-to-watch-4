import * as React from "react";

interface Props {
  src: string;
  poster: string;
  muted: boolean;
  isPlaying: boolean;
};

class VideoPlayer extends React.PureComponent<Props, {}> {
  private videoRef: React.RefObject<HTMLVideoElement>

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {poster, src, muted} = this.props;
    const video = this.videoRef.current;

    video.src = src;
    video.poster = poster;
    video.muted = muted;
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    video.src = ``;
    video.poster = ``;
    video.onplay = null;
    video.onpause = null;
  }

  componentDidUpdate() {
    const video = this.videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  render() {
    return (
      <video
        className="player__video"
        ref={this.videoRef}
      />
    );
  }
}

export default VideoPlayer;


