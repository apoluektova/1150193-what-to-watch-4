import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space';
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";
import {AuthInfo, Movie} from "../../types";

const mockStore = configureStore([]);

const userInfo: AuthInfo = {
  id: 1,
  email: `ben@mail.ru`,
  name: `Ben`,
  avatarUrl: `/wtw/static/avatar/5.jpg`,
};

const movie: Movie = {
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

it(`AddReview should render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      isError: false,
    },
    [NameSpace.APP]: {
      isFormDisabled: false,
    },
  });

  const tree = renderer
     .create(
         <Router history={history}>
           <Provider store={store}>
             <AddReview
               authorizationStatus={`AUTH`}
               authInfo={userInfo}
               movie={movie}
               onRatingChange={noop}
               onReviewChange={noop}
               onReviewFormSubmit={noop}
               isSubmitButtonDisabled={false}
               isError={false}
               isFormDisabled={false}
             />
           </Provider>
         </Router>)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
