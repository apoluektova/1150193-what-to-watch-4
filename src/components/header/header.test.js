import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";

const userInfo = {
  id: 1,
  email: `ben@mail.ru`,
  name: `Ben`,
  avatarUrl: `/wtw/static/avatar/5.jpg`,
};

it(`ErrorMessage should render correctly`, () => {
  const tree = renderer
     .create(<Header
       authorizationStatus={`AUTH`}
       authInfo={userInfo}
       onSignInClick={() => {}}
     />)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
