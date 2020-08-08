import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (props) => {
  const {onShowMoreButtonClick} = props;

  return (
    <button
      className="catalog__button"
      type="button"
      onClick={onShowMoreButtonClick}
    >Show more</button>
  );
};

ShowMoreButton.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
