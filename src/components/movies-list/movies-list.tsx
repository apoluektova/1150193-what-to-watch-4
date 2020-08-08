import * as React from "react";
import MovieCard from "../movie-card/movie-card";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import {connect} from "react-redux";
import ShowMoreButton from "../show-more-button/show-more-button";
import {ActionCreator} from "../../reducer/app/app";
import {getFilteredMovies} from "../../reducer/data/selectors";
import {getShownMovieCards} from "../../reducer/app/selectors";
import {Movie} from "../../types";

interface Props {
  movies: Array<Movie>;
  onMovieCardClick: () => void;
  onActiveCardChange: () => void;
  onShowMoreButtonClick: () => void;
  shownMovieCards: number;
}

const MovieCardWrapped = withVideoPlayer(MovieCard);

const MoviesList: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movies,
    onMovieCardClick,
    onActiveCardChange,
    onShowMoreButtonClick,
    shownMovieCards
  } = props;

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
          onShowMoreButtonClick={onShowMoreButtonClick}
        />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  movies: getFilteredMovies(state),
  shownMovieCards: getShownMovieCards(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);


