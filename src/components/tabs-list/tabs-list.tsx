import * as React from "react";
import Tab from "../tab/tab";
import MovieOverview from "../movie-overview/movie-overview";
import MovieDetails from "../movie-details/movie-details";
import MovieReviews from "../movie-reviews/movie-reviews";
import {Tabs} from "../../const";
import {Movie, ReviewInfo} from "../../types";

interface Props {
  movie: Movie;
  reviews: Array<ReviewInfo>;
  activeTab: string;
  onTabClick: () => void;
};

class TabsList extends React.PureComponent<Props, {}> {
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

export default TabsList;


