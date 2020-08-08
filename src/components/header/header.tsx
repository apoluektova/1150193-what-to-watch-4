import * as React from "react";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {AuthInfo} from "../../types";

interface Props {
  authInfo: AuthInfo;
  authorizationStatus: string;
  extraClassName: string;
  children?: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, authInfo, extraClassName, children} = props;

  return (
    <header className={`page-header ${extraClassName ? `${extraClassName}__head` : ``}`}>
      <div className="logo">
        <Link
          to={AppRoute.MAIN}
          className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH ?
          <Link to={AppRoute.MY_LIST}>
            <div className="user-block__avatar">
              <img src={authInfo.avatarUrl} alt={`${authInfo.name} avatar`} width="63" height="63"/>
            </div>
          </Link> :
          <Link
            to={AppRoute.SIGN_IN}
            className="user-block__link">
              Sign in
          </Link>}
      </div>
    </header>
  );
};

export default Header;
