import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Tab from "../tab/tab.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";

const tabTitles = [`Overview`, `Details`, `Reviews`];

class TabsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };
  }

  _renderActiveTab() {
    const activeTab = this.state;
    const {movie, reviews} = this.props;

    switch (activeTab) {
      case 0:
        return (
          <MovieOverview
            movie={movie}
          />
        );
      case 1:
        return (
          <MovieDetails
            movie={movie}/>
        );
      case 2:
        return (
          <MovieReviews
            reviews={reviews}/>
        );
    }

    return null;
  }

  render() {
    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabTitles.map((title, index) => {
              return (
                <Tab
                  key={`${title}-${index}`}
                  tabTitle={title}
                  onClick={() => {
                    this.setState({activeTab: index});
                  }}
                  activeTab={index === this.state.activeTab}
                />
              );
            })}
          </ul>
        </nav>
        {this._renderActiveTab()}
      </div>
    );
  }
}

TabsList.propTypes = {
  movie: PropTypes.shape({
    description: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
    director: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
};

export default TabsList;


