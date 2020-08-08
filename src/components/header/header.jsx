import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const Header = (props) => {
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

Header.propTypes = {
  authInfo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  extraClassName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default Header;
