import React from "react";
import PropTypes from "prop-types";

const MovieOverview = (props) => {
  const {movie: {rating, description, director, actors}} = props;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating.score}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{rating.level}</span>
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

MovieOverview.propTypes = {
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

export default MovieOverview;
