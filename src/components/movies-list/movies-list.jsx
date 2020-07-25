import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {connect} from "react-redux";
import {ALL_GENRES} from "../../const.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {ActionCreator} from "../../reducer/app/app.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {getShownMovieCards, getGenre} from "../../reducer/app/selectors.js";

const MovieCardWrapped = withVideoPlayer(MovieCard);

const getMoviesListByGenre = (movies, genre) => movies.filter((movie) => movie.genre === genre);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, onMovieCardClick, onActiveCardChange, handleShowMoreButtonClick, shownMovieCards} = this.props;
    const shownMovies = movies.slice(0, shownMovieCards);

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {shownMovies.map((movie) => {
            return (
              <MovieCardWrapped
                key={movie.id}
                movie={movie}
                onMovieCardClick={onMovieCardClick}
                onMovieCardHover={onActiveCardChange}
              />
            );
          })}
        </div>
        <div className="catalog__more">
          {shownMovieCards < movies.length && <ShowMoreButton
            handleShowMoreButtonClick={handleShowMoreButtonClick}
          />}
        </div>
      </React.Fragment>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
  handleShowMoreButtonClick: PropTypes.func.isRequired,
  shownMovieCards: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  movies: (getGenre(state) === ALL_GENRES) ? getMovies(state) : getMoviesListByGenre(getMovies(state), getGenre(state)),
  shownMovieCards: getShownMovieCards(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);


