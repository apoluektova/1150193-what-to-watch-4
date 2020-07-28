import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Genre from "../genre/genre.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app.js";
import {getGenre} from "../../reducer/app/selectors.js";
import {getGenresList} from "../../reducer/data/selectors.js";

const MAX_GENRES_AMOUNT = 9;

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
  activeGenre: getGenre(state),
  genresList: getGenresList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetShownMovieCardsCount());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
