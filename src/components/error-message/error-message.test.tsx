import * as React from "react";
import * as renderer from "react-test-renderer";
import ErrorMessage from "./error-message";
import {Router} from "react-router-dom";
import history from "../../history";

it(`ErrorMessage should render correctly`, () => {
  const tree = renderer
     .create(
         <Router history={history}>
           <ErrorMessage/>
         </Router>)
     .toJSON();

  expect(tree).toMatchSnapshot();
});
