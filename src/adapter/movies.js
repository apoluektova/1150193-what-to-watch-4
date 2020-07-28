export const createMovie = (movie) => {
  return {
    id: movie.id,
    previewImage: movie.preview_image,
    previewVideo: movie.preview_video_link,
    videoLink: movie.video_link,
    title: movie.name,
    backgroundImage: movie.background_image,
    backgroundColor: movie.background_color,
    poster: movie.poster_image,
    genre: movie.genre,
    releaseDate: movie.released,
    description: movie.description,
    rating: {
      score: movie.rating,
      count: movie.scores_count,
    },
    director: movie.director,
    actors: movie.starring,
    runtime: movie.run_time,
    isFavorite: movie.is_favorite,
  };
};

export const createMovies = (movies) => {
  return movies.map((movie) => createMovie(movie));
};
