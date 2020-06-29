import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";

const MovieReviews = (props) => {
  const {reviews} = props;

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviews.map((review) => {
          return (
            <Review
              key={review.id}
              text={review.text}
              author={review.author}
              date={review.date}
              rating={review.rating}
            />
          );
        })}
      </div>
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,
};

export default MovieReviews;
