import React from "react";
import PropTypes from "prop-types";
import TabsList from "../tabs-list/tabs-list.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.js";

const MoviesListWrapped = withActiveCard(MoviesList);
const TabsListWrapped = withActiveTab(TabsList);

const SIMILAR_MOVIES_COUNT = 4;

const MoviePage = (props) => {
  const {movies, movie, reviews, onMovieCardClick} = props;

  const filteredMovies = movies.filter((currentMovie) => currentMovie.genre === movie.genre && currentMovie.title !== movie.title);
  const similarMovies = filteredMovies.slice(0, SIMILAR_MOVIES_COUNT);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
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
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
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
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.poster} alt={movie.title} width="218" height="327" />
            </div>

            {<TabsListWrapped movie={movie} reviews={reviews} />}

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesListWrapped
            movies={similarMovies}
            onMovieCardClick={onMovieCardClick}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
};

MoviePage.propTypes = {
  movie: PropTypes.exact({
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
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
    }),
    director: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviePage;
