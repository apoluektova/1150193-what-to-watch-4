import * as React from "react";
import {formatRuntime} from "../../utils.js";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
};

const MovieDetails: React.FunctionComponent<Props> = (props: Props) => {
  const {movie: {genre, releaseDate, director, actors, runtime}} = props;
  const filmRuntime = formatRuntime(runtime);

  return (
    <React.Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {actors.map((actor, index) => {
                return (
                  <React.Fragment key={`${actor}-${index}`}>
                    {actor}
                    {index !== actors.length - 1 ? `,` : ``}
                    {index !== actors.length - 1 ? <br/> : ``}
                  </React.Fragment>
                );
              })}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{filmRuntime}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{releaseDate}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieDetails;
