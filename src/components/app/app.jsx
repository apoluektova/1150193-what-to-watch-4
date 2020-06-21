import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentMovieCard: null,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(currentMovieCard) {
    this.setState({currentMovieCard});
  }

  _renderApp() {
    const {promoMovie, movies} = this.props;
    const {currentMovieCard} = this.state;

    if (currentMovieCard) {
      return <MovieDetails movie={currentMovieCard} />;
    }

    return (
      <Main
        promoMovie={promoMovie}
        movies={movies}
        onMovieCardTitleClick={this._handleMovieCardClick}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-details">
            <MovieDetails
              movie={this.state.currentMovieCard}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoMovie: PropTypes.exact({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default App;


// import React, {PureComponent} from "react";
// import PropTypes from "prop-types";
// import {Switch, Route, BrowserRouter} from "react-router-dom";
// import Main from "../main/main.jsx";
// import MovieDetails from "../movie-details/movie-details.jsx";

// const movieCardHoverHandler = () => {};

// class App extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentMovieCard: null,
//     };

//     this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
//   }

//   _handleMovieCardClick(movieCard) {
//     this.setState({movieCard});
//   }

//   _renderApp() {
//     const {title, genre, releaseDate, movies} = this.props;
//     const {currentMovieCard} = this.state;

//     if (currentMovieCard) {
//       return <MovieDetails movie={currentMovieCard} />;
//     }

//     return (
//       <Main
//         title={title}
//         genre={genre}
//         releaseDate={releaseDate}
//         movies={movies}
//         onMovieCardTitleClick={this._handleMovieCardClick}
//         onMovieCardHover={movieCardHoverHandler}
//       />
//     );
//   }

//   render() {
//     const {movies} = this.props;

//     return (
//       <BrowserRouter>
//         <Switch>
//           <Route exact path="/">
//             {this._renderApp()}
//           </Route>
//           <Route exact path="/movie-details">
//             <MovieDetails movie={movies[0]}/>
//           </Route>
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }


// App.propTypes = {
//   title: PropTypes.string.isRequired,
//   genre: PropTypes.string.isRequired,
//   releaseDate: PropTypes.number.isRequired,
//   movies: PropTypes.arrayOf(
//       PropTypes.exact({
//         title: PropTypes.string.isRequired,
//         backgroundImage: PropTypes.string.isRequired,
//         poster: PropTypes.string.isRequired,
//         genre: PropTypes.string.isRequired,
//         releaseDate: PropTypes.number.isRequired,
//         description: PropTypes.string.isRequired,
//         rating: PropTypes.exact({
//           score: PropTypes.number.isRequired,
//           level: PropTypes.string.isRequired,
//           count: PropTypes.number.isRequired,
//         }),
//         director: PropTypes.string.isRequired,
//         actors: PropTypes.string.isRequired,
//       })).isRequired,
// };

// export default App;
