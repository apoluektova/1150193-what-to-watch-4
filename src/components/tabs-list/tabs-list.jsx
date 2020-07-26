import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Tab from "../tab/tab.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import {Tabs} from "../../const.js";

class TabsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderActiveTab() {
    const {movie, reviews, activeTab} = this.props;

    switch (activeTab) {
      case Tabs.OVERVIEW:
        return (
          <MovieOverview
            movie={movie}
          />
        );
      case Tabs.DETAILS:
        return (
          <MovieDetails
            movie={movie}/>
        );
      case Tabs.REVIEWS:
        return (
          <MovieReviews
            reviews={reviews}/>
        );
      default:
        return (
          <MovieOverview
            movie={movie}
          />
        );
    }
  }

  render() {
    const tabTitles = Object.values(Tabs);
    const {activeTab, onTabClick} = this.props;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabTitles.map((title, index) => {
              return (
                <Tab
                  key={`${title}-${index}`}
                  tabTitle={title}
                  onTabClick={onTabClick}
                  activeTab={activeTab}
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
      count: PropTypes.number.isRequired,
    }),
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default TabsList;


