import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import Loader from "../loader/loader";
import {RouterProps} from 'react-router';

interface Props {
  authorizationStatus: string;
  path: string;
  exact: boolean;
  render: (routeProps: RouterProps) => React.ReactNode;
};

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {

        switch (authorizationStatus) {
          case (AuthorizationStatus.UNKNOWN):
            return <Loader />;
          case (AuthorizationStatus.NO_AUTH):
            return <Redirect to={AppRoute.SIGN_IN} />;
          case (AuthorizationStatus.AUTH):
            return render(routeProps);
        }
        return render(routeProps);
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
