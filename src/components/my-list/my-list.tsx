import * as React from "react";
import Header from "../header/header";
import MovieCard from "../movie-card/movie-card";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import Footer from "../footer/footer";
import {AuthInfo, Movie} from "../../types";

interface Props {
  authorizationStatus: string;
  authInfo: AuthInfo;
  favoriteMovies: Array<Movie>;
  onMovieCardClick: () => void;
  onActiveCardChange: () => void;
}

const MovieCardWrapped = withVideoPlayer(MovieCard);

const MyList: React.FunctionComponent<Props> = (props: Props) => {
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

export default MyList;

