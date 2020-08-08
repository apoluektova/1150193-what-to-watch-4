import * as React from "react";
import Review from "../review/review";
import {ReviewInfo} from "../../types";

interface Props {
  reviews: Array<ReviewInfo>;
}

const MovieReviews: React.FunctionComponent<Props> = (props: Props) => {
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

export default MovieReviews;
