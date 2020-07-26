import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";

const MoviesListWrapped = withActiveCard(MoviesList);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      promoMovie,
      onMovieCardClick,
      onPlayButtonClick,
    } = this. props;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg" style={{background: promoMovie.backgroundColor}}>
            <img src={promoMovie.backgroundImage} alt={promoMovie.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

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
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList/>

            <MoviesListWrapped onMovieCardClick={onMovieCardClick}
            />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  promoMovie: PropTypes.exact({
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default Main;
