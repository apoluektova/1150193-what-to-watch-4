import React from "react";
import renderer from "react-test-renderer";
import SignInScreen from "./sign-in-screen.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`SignInScreen should render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <SignInScreen
          onSubmit={() => {}}
          isSignInError={false}
        />
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
