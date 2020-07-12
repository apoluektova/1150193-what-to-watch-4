import React from "react";
import renderer from "react-test-renderer";
import withVideoPlayer from "./with-video-player.js";

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
       onVideoPlay={() => {}}
       onVideoStop={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

