import * as React from "react";
import {Subtract} from "utility-types";
import {Review} from "../../const";

interface State {
  rating: number;
  comment: string;
  isSubmitButtonDisabled: boolean;
}

interface InjectingProps {
  onRatingChange: () => void;
  onReviewChange: () => void;
  onReviewFormSubmit: () => void;
  isSubmitButtonDisabled: boolean;
}

const withReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithReview extends React.PureComponent<T, State> {
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

  return WithReview;
};

export default withReview;
