import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import PromoMovie from "../promo-movie/promo-movie.jsx";
import Loader from "../loader/loader.jsx";
import Footer from "../footer/footer.jsx";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";

const MoviesListWrapped = withActiveCard(MoviesList);

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      authorizationStatus,
      promoMovie,
      onMovieCardClick,
      onPlayButtonClick,
      authInfo,
      onSignInClick
    } = this. props;

    return (
      <React.Fragment>
        {Object.keys(promoMovie).length === 0 ? <Loader />
          : <PromoMovie
            authorizationStatus={authorizationStatus}
            promoMovie={promoMovie}
            onPlayButtonClick={onPlayButtonClick}
            authInfo={authInfo}
            onSignInClick={onSignInClick}
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
  }
}

Main.propTypes = {
  promoMovie: PropTypes.shape({
    id: PropTypes.number,
    previewImage: PropTypes.string,
    previewVideo: PropTypes.string,
    videoLink: PropTypes.string,
    title: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    poster: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
    description: PropTypes.string,
    rating: PropTypes.shape({
      score: PropTypes.number,
      count: PropTypes.number,
    }),
    director: PropTypes.string,
    actors: PropTypes.array,
    runtime: PropTypes.number,
    isFavorite: PropTypes.bool,
  }).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.object.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

export default Main;
