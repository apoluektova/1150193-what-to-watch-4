import * as React from "react";
import * as renderer from "react-test-renderer";
import Header from "./header";
import {Router} from "react-router-dom";
import history from "../../history";
import {AuthInfo} from "../../types";

const userInfo: AuthInfo = {
  id: 1,
  email: `ben@mail.ru`,
  name: `Ben`,
  avatarUrl: `/wtw/static/avatar/5.jpg`,
};

it(`Header should render correctly`, () => {
  const tree = renderer
     .create(
         <Router history={history}>
           <Header
             authorizationStatus={`AUTH`}
             authInfo={userInfo}
             extraClassName={``}
           />
         </Router>
     )
     .toJSON();

  expect(tree).toMatchSnapshot();
});
