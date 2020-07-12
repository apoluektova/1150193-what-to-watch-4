import React from "react";
import PropTypes from "prop-types";

const Tab = (props) => {
  const {tabTitle, onTabClick, activeTab} = props;
  const activeClass = `movie-nav__item ${tabTitle === activeTab ? `movie-nav__item--active` : ``}`;

  const handleTabClick = () => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(tabTitle);
    };
  };

  return (
    <li className={activeClass}>
      <a
        href="#"
        className="movie-nav__link"
        onClick={handleTabClick()}>{tabTitle}</a>
    </li>
  );
};

Tab.propTypes = {
  tabTitle: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default Tab;

