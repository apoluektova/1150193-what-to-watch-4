import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import TabsList from "../tabs-list/tabs-list.jsx";
import MoreLikeThis from "../more-like-this/more-like-this.jsx";
import Footer from "../footer/footer.jsx";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.js";
import {connect} from "react-redux";
import {getReviews} from "../../reducer/data/selectors.js";
import Header from "../header/header.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getIsSignInError, getAuthorizationStatus, getAuthorizationInfo} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import history from "../../history.js";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import { getCurrentMovieCard } from "../../reducer/app/selectors.js";

const MoreLikeThisWrapped = withActiveCard(MoreLikeThis);
const TabsListWrapped = withActiveTab(TabsList);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMyListClick = this._handleMyListClick.bind(this);
  }

  componentDidMount() {
    const {movie, loadMovieData} = this.props;
    loadMovieData(movie);
  }

  componentDidUpdate() {
    const {movie, loadMovieData} = this.props;
    loadMovieData(movie);
  }

  _handleMyListClick() {
    const {authorizationStatus, movie, addMovieToFavorites} = this.props;

    return authorizationStatus === AuthorizationStatus.AUTH ?
      addMovieToFavorites(movie) :
      history.push(AppRoute.SIGN_IN);
  }

  render() {
    const {
      movie,
      reviews,
      onMovieCardClick,
      authInfo,
      authorizationStatus,
      currentMovieCard
    } = this.props;

    console.log(`movie`, movie);

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{background: movie.backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header
              authorizationStatus={authorizationStatus}
              authInfo={authInfo}
              extraClassName={`movie-card`}
            />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.releaseDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    to={`${AppRoute.PLAYER}/${movie.id}`}
                    className="btn btn--play movie-card__button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>

                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={this._handleMyListClick}
                  >
                    {movie.isFavorite ?
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg> :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>}
                    <span>My list</span>
                  </button>

                  {authorizationStatus === AuthorizationStatus.AUTH &&
                  <Link
                    to={`${AppRoute.MOVIE}/${movie.id}/review`}
                    className="btn movie-card__button"
                  >Add review
                  </Link>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.poster} alt={`${movie.title} poster`} width="218" height="327" />
              </div>

              {<TabsListWrapped movie={movie} reviews={reviews} />}

            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoreLikeThisWrapped
              onMovieCardClick={onMovieCardClick}
              currentMovieCard={movie}
            />
          </section>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

MoviePage.propTypes = {
  movie: PropTypes.exact({
    id: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      score: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    runtime: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  authInfo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  addMovieToFavorites: PropTypes.func.isRequired,
  loadMovieData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  isSignInError: getIsSignInError(state),
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state),
  currentMovieCard: getCurrentMovieCard(state),
});


const mapDispatchToProps = (dispatch) => ({
  addMovieToFavorites(movie) {
    dispatch(DataOperation.addMovieToFavorites(movie));
  },
  loadMovieData(movie) {
    dispatch(DataOperation.loadReviews(movie.id));
    dispatch(AppActionCreator.changeMovieCard(movie));
    dispatch(AppActionCreator.changeGenre(movie.genre));
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
