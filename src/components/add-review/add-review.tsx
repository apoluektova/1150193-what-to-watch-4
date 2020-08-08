import * as React from "react";
import Header from "../header/header";
import {Review} from "../../const";
import {connect} from "react-redux";
import {getIsError} from "../../reducer/data/selectors";
import {getIsFormDisabled} from "../../reducer/app/selectors";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import Loader from "../loader/loader";
import {AuthInfo, Movie} from "../../types";

interface Props {
  authorizationStatus: string;
  authInfo: AuthInfo;
  movie: Movie;
  onRatingChange: () => void;
  onReviewChange: () => void;
  onReviewFormSubmit: () => void;
  isSubmitButtonDisabled: boolean;
  isError: boolean;
  isFormDisabled: boolean;
};

const STARS_AMOUNT = 5;

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
  const {
    authorizationStatus,
    authInfo,
    movie,
    onRatingChange,
    onReviewChange,
    onReviewFormSubmit,
    isSubmitButtonDisabled,
    isError,
    isFormDisabled} = props;

  return (
    movie ?
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{background: movie.backgroundColor}}>
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header
              authorizationStatus={authorizationStatus}
              authInfo={authInfo}
              extraClassName={``}>

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link
                      to={`${AppRoute.MOVIE}/${movie.id}`}
                      className="breadcrumbs__link">{movie.title}
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

            </Header>

            <div className="movie-card__poster movie-card__poster--small">
              <img src={movie.poster} alt={`${movie.title} poster`} width="218" height="327" />
            </div>
          </div>

          <div className="add-review">
            <form
              action="#"
              className="add-review__form"
              onSubmit={onReviewFormSubmit}
            >
              <div className="rating">
                <div className="rating__stars" onChange={onRatingChange}>
                  {new Array(STARS_AMOUNT)
                  .fill(``)
                  .map((element, index) => {
                    const rating = index + 1;
                    return (
                      <React.Fragment key = {`key - ${rating}`}>
                        <input
                          className="rating__input"
                          id={`star-${rating}`}
                          type="radio"
                          name="rating"
                          value={rating}
                          disabled={isFormDisabled}
                        />
                        <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                      </React.Fragment>
                    );
                  })
                  }
                </div>
              </div>

              <div className="add-review__text" style={{backgroundColor: `rgba(255, 255, 255, 0.5)`}}>
                <textarea
                  className="add-review__textarea"
                  name="review-text" id="review-text"
                  placeholder="Review text"
                  minLength={Review.MIN_LENGTH}
                  maxLength={Review.MAX_LENGTH}
                  onChange={onReviewChange}
                  disabled={isFormDisabled}
                  required
                ></textarea>
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    disabled={isSubmitButtonDisabled}
                    style={{cursor: `${isSubmitButtonDisabled ? `default` : `pointer`}`}}
                  >Post</button>
                </div>

              </div>
            </form>
            {isError &&
           <p style={{color: `tomato`, textAlign: `center`}}>Your review has not been sent. Please try again later.</p>}
          </div>

        </section>
      </React.Fragment>
      : <Loader />
  );
};

const mapStateToProps = (state) => ({
  isError: getIsError(state),
  isFormDisabled: getIsFormDisabled(state),
});

export default connect(mapStateToProps)(AddReview);
