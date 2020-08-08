import * as React from "react";
import * as renderer from "react-test-renderer";
import withReview from "./with-review";
import {Movie} from "../../types";
import {noop} from "../../utils";

const MOVIE: Movie = {
  id: 1,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `The Grand Budapest Hotel`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#A6B7AC`,
  poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2014,
  description: `The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson, which explores tragedy, war, fascism, nostalgia, friendship, and loyalty.`,
  rating: {
    score: 9.3,
    count: 250,
  },
  director: `Wes Anderson`,
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: 99,
  isFavorite: false,
};

const MockComponent = (props) => {
  return (
    <div {...props} />
  );
};

const MockComponentWrapped = withReview(MockComponent);

it(`withReview should render correctly`, () => {
  const tree = renderer
     .create(<MockComponentWrapped
       movie={MOVIE}
       onRatingChange={noop}
       onReviewChange={noop}
       onReviewFormSubmit={noop}
       isSubmitButtonDisabled={false}
       onReviewSubmit={noop}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});

