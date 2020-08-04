import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import Footer from "../footer/footer.jsx";

const MovieCardWrapped = withVideoPlayer(MovieCard);

const MyList = (props) => {
  const {authorizationStatus, authInfo, favoriteMovies, onMovieCardClick, onActiveCardChange} = props;

  return (
    <React.Fragment>
      <div className="user-page">
        <Header
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
          extraClassName={`user-page`}
        >

          <h1 className="page-title user-page__title">My list</h1>

        </Header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            {favoriteMovies.map((movie) => {
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
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
};

MyList.propTypes = ({
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.object.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onActiveCardChange: PropTypes.func.isRequired,
});

export default MyList;
