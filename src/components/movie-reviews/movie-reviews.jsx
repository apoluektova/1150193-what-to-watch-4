import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";

const MovieReviews = (props) => {
  const {reviews} = props;

  const reviewsHalf = Math.ceil(reviews.length / 2);
  const leftColumnReviews = reviews.slice(0, reviewsHalf);
  const rightColumnReviews = reviews.slice(reviewsHalf, reviews.length);
  const reviewsInColumns = [leftColumnReviews, rightColumnReviews];

  return (
    <div className="movie-card__reviews movie-card__row">
      {reviewsInColumns.map((reviewsInColumn, index) => {
        return (
          <div className="movie-card__reviews-col" key={index + Math.random()}>
            {reviewsInColumn.map((review) => <Review key={review.id} review={review} />)}
          </div>
        );
      })}
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
