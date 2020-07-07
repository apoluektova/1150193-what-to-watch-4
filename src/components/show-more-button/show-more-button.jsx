import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (props) => {
  const {handleShowMoreButtonClick} = props;

  return (
    <button
      className="catalog__button"
      type="button"
      onClick={handleShowMoreButtonClick}
    >Show more</button>
  );
};

ShowMoreButton.propTypes = {
  handleShowMoreButtonClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
