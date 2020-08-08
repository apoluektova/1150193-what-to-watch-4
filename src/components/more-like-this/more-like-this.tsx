import * as React from "react";
import MovieCard from "../movie-card/movie-card";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import {connect} from "react-redux";
import {getFilteredMovies} from "../../reducer/data/selectors";
import {SIMILAR_MOVIES_COUNT} from "../../const";
import {Movie} from "../../types";

interface Props {
  movies: Array<Movie>;
  onMovieCardClick: () => void;
  onActiveCardChange: () => void;
  currentMovieCard: Movie;
}

const MovieCardWrapped = withVideoPlayer(MovieCard);

const getMoviesLikeThis = (movies, currentMovieCard) => {
  return (movies
    .filter((movie) => movie.id !== currentMovieCard.id)
    .slice(0, SIMILAR_MOVIES_COUNT)
  );
};

const MoreLikeThis: React.FunctionComponent<Props> = (props: Props) => {
  const {movies, onMovieCardClick, onActiveCardChange, currentMovieCard} = props;

  const moviesLikeThis = getMoviesLikeThis(movies, currentMovieCard);

  return (
    <div className="catalog__movies-list">
      {moviesLikeThis.map((movie) => {
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
  );
};

const mapStateToProps = (state) => ({
  movies: getFilteredMovies(state),
});


export {MoreLikeThis};
export default connect(mapStateToProps)(MoreLikeThis);
