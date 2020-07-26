import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {connect} from "react-redux";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {ActionCreator} from "../../reducer/app/app.js";
import {getFilteredMovies} from "../../reducer/data/selectors.js";
import {getShownMovieCards} from "../../reducer/app/selectors.js";

const MovieCardWrapped = withVideoPlayer(MovieCard);

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
  movies: getFilteredMovies(state),
  shownMovieCards: getShownMovieCards(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);


