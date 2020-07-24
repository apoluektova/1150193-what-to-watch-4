import React from "react";
import PropTypes from "prop-types";

const Genre = (props) => {
  const {genreName, onGenreClick, activeGenre} = props;
  const activeClass = `catalog__genres-item ${activeGenre === genreName ? `catalog__genres-item--active` : ``}`;

  return (
    <li className={activeClass}>
      <a
        href="#"
        className="catalog__genres-link"
        onClick={(evt) => {
          evt.preventDefault();
          onGenreClick(genreName);
        }}>
        {genreName}
      </a>
    </li>
  );
};

Genre.propTypes = {
  genreName: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
};

export default Genre;
