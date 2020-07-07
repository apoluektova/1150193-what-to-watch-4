import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (handleShowMoreButtonClick) => {
  return (
    <button
      className="catalog__button"
      type="button"
      onClick={handleShowMoreButtonClick}
    >Show more</button>
  );
};

ShowMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
