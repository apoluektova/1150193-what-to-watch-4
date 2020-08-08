import * as React from "react";
import {getRatingLevel} from "../../utils";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
}

const MovieOverview: React.FunctionComponent<Props> = (props: Props) => {
  const {movie: {rating, description, director, actors}} = props;
  const level = getRatingLevel(rating.score);
  const score = rating.score.toString().replace(`.`, `,`);

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{score}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{level}</span>
          <span className="movie-rating__count">{rating.count} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {description}
        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actors.slice(0, 4).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

export default MovieOverview;
