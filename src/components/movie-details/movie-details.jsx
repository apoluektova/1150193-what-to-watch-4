import React from "react";
import PropTypes from "prop-types";

const MovieDetails = (props) => {
  const {movie: {genre, releaseDate, director, actors, runtime}} = props;
  const movieActors = actors.split(`, `);

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
              {movieActors.map((actor, index) => {
                return (
                  <React.Fragment key={`${actor}-${index}`}>
                    {actor}<br />
                  </React.Fragment>
                );
              })}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{runtime}</span>
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

MovieDetails.propTypes = {
  movie: PropTypes.exact({
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieDetails;
