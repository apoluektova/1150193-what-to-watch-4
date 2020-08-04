import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";

const PromoMovie = (props) => {
  const {authorizationStatus, promoMovie, onPlayButtonClick, authInfo} = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg" style={{background: promoMovie.backgroundColor}}>
        <img src={promoMovie.backgroundImage} alt={promoMovie.title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header
        authorizationStatus={authorizationStatus}
        authInfo={authInfo}
        extraClassName={`movie-card`}
      />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={promoMovie.poster} alt={`${promoMovie.title} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovie.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovie.genre}</span>
              <span className="movie-card__year">{promoMovie.releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <button
                onClick={onPlayButtonClick}
                className="btn btn--play movie-card__button"
                type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <Link
                className="btn btn--list movie-card__button"
                to={AppRoute.MY_LIST}>
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PromoMovie.propTypes = {
  promoMovie: PropTypes.exact({
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
  onPlayButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default PromoMovie;
