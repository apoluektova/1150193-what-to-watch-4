import * as React from "react";
import MoviesList from "../movies-list/movies-list";
import GenresList from "../genres-list/genres-list";
import PromoMovie from "../promo-movie/promo-movie";
import Loader from "../loader/loader";
import Footer from "../footer/footer";
import withActiveCard from "../../hocs/with-active-card/with-active-card";
import {Movie, AuthInfo} from "../../types";

interface Props {
  promoMovie: Movie;
  onMovieCardClick: () => void;
  authorizationStatus: string;
  authInfo: AuthInfo;
  addMovieToFavorites: () => void;
}

const MoviesListWrapped = withActiveCard(MoviesList);

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    authorizationStatus,
    promoMovie,
    onMovieCardClick,
    authInfo,
    addMovieToFavorites
  } = props;

  return (
    <React.Fragment>
      {Object.keys(promoMovie).length === 0 ? <Loader />
        : <PromoMovie
          authorizationStatus={authorizationStatus}
          promoMovie={promoMovie}
          authInfo={authInfo}
          addMovieToFavorites={addMovieToFavorites}
        /> }

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList/>

          <MoviesListWrapped onMovieCardClick={onMovieCardClick} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Main;
