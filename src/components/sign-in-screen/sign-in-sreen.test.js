import React from "react";
import renderer from "react-test-renderer";
import SignInScreen from "./sign-in-screen.jsx";

it(`SignInScreen should render correctly`, () => {
  const tree = renderer.create(
      <SignInScreen
        onSubmit={() => {}}
        isSignInError={false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
