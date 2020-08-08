import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";
import {AuthInfo, Movie} from "../../types";

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

configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    isError: false,
  },
  [NameSpace.APP]: {
    isFormDisabled: false,
  },
});

it(`Review should be submitted`, () => {
  const onReviewFormSubmit = jest.fn();

  const addReview = mount(
      <Router history={history}>
        <Provider store={store}>
          <AddReview
            authorizationStatus={`AUTH`}
            authInfo={userInfo}
            movie={movie}
            onRatingChange={noop}
            onReviewChange={noop}
            onReviewFormSubmit={onReviewFormSubmit}
            isSubmitButtonDisabled={false}
            isError={false}
            isFormDisabled={false}
          />
        </Provider>
      </Router>
  );

  const reviewForm = addReview.find(`form`);

  reviewForm.simulate(`submit`);

  expect(onReviewFormSubmit).toHaveBeenCalledTimes(1);
});
