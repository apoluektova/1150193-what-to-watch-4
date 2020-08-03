import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Review} from "../../const.js";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitButtonDisabled: true,
      };

      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleReviewFormSubmit = this._handleReviewFormSubmit.bind(this);
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: evt.target.value,
      });
    }

    _handleReviewChange(evt) {
      this.setState({
        comment: evt.target.value,
        isSubmitButtonDisabled: (evt.target.value.length < Review.MIN_LENGTH) || (evt.target.value.length > Review.MAX_LENGTH),
      });
    }

    _handleReviewFormSubmit(evt) {
      const {movie, onReviewSubmit} = this.props;

      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      evt.preventDefault();
      onReviewSubmit(movie.id, review);
    }

    render() {
      return (
        <Component
          {...this.props}
          onRatingChange={this._handleRatingChange}
          onReviewChange={this._handleReviewChange}
          onReviewFormSubmit={this._handleReviewFormSubmit}
          isSubmitButtonDisabled={this.state.isSubmitButtonDisabled}
        />
      );
    }

  }

  WithReview.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    onReviewSubmit: PropTypes.func.isRequired,
  };

  return WithReview;
};

export default withReview;
