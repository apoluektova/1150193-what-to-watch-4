import * as React from "react";
import * as renderer from "react-test-renderer";
import withVideoPlayer from "./with-video-player";
import {noop} from "../../utils";

const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

it(`withVideoPlayer should render correctly`, () => {
  const tree = renderer
     .create(<MockComponentWrapped
       isPlaying={false}
       onVideoPlay={noop}
       onVideoStop={noop}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

