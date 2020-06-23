import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {previewVideo, previewImage} = this.props;

    return (
      <video
        width="280"
        height="175"
        muted
        src={previewVideo}
        poster={previewImage}/>
    );
  }
}

VideoPlayer.propTypes = {
  previewVideo: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
};

