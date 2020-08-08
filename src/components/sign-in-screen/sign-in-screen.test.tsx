import * as React from "react";
import * as renderer from "react-test-renderer";
import SignInScreen from "./sign-in-screen";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";

it(`SignInScreen should render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <SignInScreen
          onSubmit={noop}
          isSignInError={false}
        />
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
