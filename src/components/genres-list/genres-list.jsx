import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Genre from "../genre/genre.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {ALL_GENRES} from "../../const.js";

const MAX_GENRES_AMOUNT = 9;

const getGenresList = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
};

class GenresList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onGenreClick, activeGenre, genresList} = this.props;

    return (
      <ul className="catalog__genres-list">
        {genresList.slice(0, MAX_GENRES_AMOUNT).map((genre, index) => {
          return (
            <Genre
              key={`${genre}-${index}`}
              genreName={genre}
              onGenreClick={onGenreClick}
              activeGenre={activeGenre}
            />
          );
        })}
      </ul>
    );
  }
}

GenresList.propTypes = {
  genresList: PropTypes.array.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.genre,
  genresList: getGenresList(state.movies),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetShownMovieCardsCount());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
