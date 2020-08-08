import * as React from "react";
import Genre from "../genre/genre";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app";
import {getGenre} from "../../reducer/app/selectors";
import {getGenresList} from "../../reducer/data/selectors";

interface Props {
  genresList: Array<string>;
  onGenreClick: () => void;
  activeGenre: string;
}

const MAX_GENRES_AMOUNT = 9;

const GenresList: React.FunctionComponent<Props> = (props: Props) => {
  const {onGenreClick, activeGenre, genresList} = props;

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
