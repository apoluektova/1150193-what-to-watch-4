import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {connect} from "react-redux";
import {ALL_GENRES} from "../../const.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import {ActionCreator} from "../../reducer.js";

const MoviesListWrapped = withActiveCard(MoviesList);

const getMoviesListByGenre = (movies, genre) => movies.filter((movie) => movie.genre === genre);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      promoMovie,
      movies,
      onMovieCardClick,
      onGenreClick,
      activeGenre,
      genresList,
      handleShowMoreButtonClick,
      shownMovieCards} = this. props;

    const shownMovies = movies.slice(0, shownMovieCards);

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{promoMovie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{promoMovie.genre}</span>
                  <span className="movie-card__year">{promoMovie.releaseDate}</span>
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList
              genresList={genresList}
              onGenreClick={onGenreClick}
              activeGenre={activeGenre}
            />

            <MoviesListWrapped
              movies={shownMovies}
              onMovieCardClick={onMovieCardClick}
            />

            <div className="catalog__more">
              {shownMovieCards < movies.length && <ShowMoreButton
                handleShowMoreButtonClick={handleShowMoreButtonClick}
              />}
            </div>
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
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
  genresList: PropTypes.array.isRequired,
  handleShowMoreButtonClick: PropTypes.func.isRequired,
  shownMovieCards: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  movies: (state.genre === ALL_GENRES) ? state.movies : getMoviesListByGenre(state.movies, state.genre),
  activeGenre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetShownMovieCardsCount());
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
