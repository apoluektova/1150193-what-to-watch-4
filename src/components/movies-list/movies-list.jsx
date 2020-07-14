import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {connect} from "react-redux";
import {ALL_GENRES} from "../../const.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {ActionCreator} from "../../reducer.js";

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
          {shownMovies.map((movie, index) => {
            return (
              <MovieCardWrapped
                key={movie.title + index}
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
  movies: (state.genre === ALL_GENRES) ? state.movies : getMoviesListByGenre(state.movies, state.genre),
  shownMovieCards: state.shownMovieCards,
});

const mapDispatchToProps = (dispatch) => ({
  handleShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);


