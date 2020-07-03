import React from "react";
import PropTypes from "prop-types";

const Tab = (props) => {
  const {tabTitle, onClick, activeTab} = props;
  const activeClass = `movie-nav__item ${activeTab ? `movie-nav__item--active` : ``}`;

  return (
    <li className={activeClass}>
      <a
        href="#"
        className="movie-nav__link"
        onClick={onClick}>{tabTitle}</a>
    </li>
  );
};

Tab.propTypes = {
  tabTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeTab: PropTypes.bool.isRequired,
};

export default Tab;

