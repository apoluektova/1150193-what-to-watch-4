import * as React from "react";
import Header from "../header/header";
import {AppRoute} from "../../const";
import {Link} from "react-router-dom";
import history from "../../history";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Movie, AuthInfo} from "../../types";

interface Props {
  promoMovie: Movie;
  authorizationStatus: string;
  authInfo: AuthInfo;
  addMovieToFavorites: (promoMovie: Movie) => void;
};

const PromoMovie: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, promoMovie, addMovieToFavorites, authInfo} = props;

  const handleMyListClick = () => {
    return authorizationStatus === AuthorizationStatus.AUTH ?
      addMovieToFavorites(promoMovie) :
      history.push(AppRoute.SIGN_IN);
  };

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
              <Link
                className="btn btn--play movie-card__button"
                to={`${AppRoute.PLAYER}/${promoMovie.id}`}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <button
                className="btn btn--list movie-card__button"
                type="button"
                onClick={handleMyListClick}
              >
                {promoMovie.isFavorite ?
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg> :
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>}
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoMovie;
