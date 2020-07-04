import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {ALL_GENRES} from "./const.js";

const PROMO_MOVIE = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

const movies = [
  {
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Fantasy`,
    releaseDate: 2018,
    description: `The plot follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.`,
    rating: {
      score: 8.9,
      level: `Very good`,
      count: 240,
    },
    director: `David Yates`,
    actors: `Eddie Redmayne, Katherine Waterston, Dan Fogler, Alison Sudol, Ezra Miller, Zoë Kravitz`,
    runtime: `1h 39m`,
  },
  {
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Bohemian Rhapsody`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Drama`,
    releaseDate: 2018,
    description: `A British-American venture, the film was produced by 20th Century Fox, Regency Enterprises, GK Films, and Queen Films, with Fox serving as distributor. The film follows the singer's life from the formation of the band up to their 1985 Live Aid performance at the original Wembley Stadium.`,
    rating: {
      score: 9.0,
      level: `Awesome`,
      count: 250,
    },
    director: `Bryan Singer`,
    actors: `Rami Malek, Lucy Boynton, Gwilym Lee, Ben Hardy, Joe Mazzello, Aidan Gillen, Tom Hollander`,
    runtime: `1h 39m`,
  },
  {
    previewImage: `img/macbeth.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Macbeth`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Drama`,
    releaseDate: 2015,
    description: `The story follows a Scottish general's rise to power after receiving a prophecy from a trio of witches that one day he will become King of Scotland. Like the play it was adapted from, the film dramatises the damaging physical and psychological effects of political ambition on those who seek power for its own sake.`,
    rating: {
      score: 8.0,
      level: `Very good`,
      count: 234,
    },
    director: `Justin Kurzel`,
    actors: `Michael Fassbender, Marion Cotillard, Paddy Considine, Sean Harris`,
    runtime: `1h 39m`,
  },
  {
    previewImage: `img/aviator.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Aviator`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Drama`,
    releaseDate: 2004,
    description: `Based on the 1993 non-fiction book Howard Hughes: The Secret Life by Charles Higham, the film depicts the life of Howard Hughes, an aviation pioneer and director of Hell's Angels. The film portrays his life from 1927–1947 during which time Hughes became a successful film producer and an aviation magnate while simultaneously growing more unstable due to severe obsessive–compulsive disorder (OCD).`,
    rating: {
      score: 8.7,
      level: `Very good`,
      count: 241,
    },
    director: `Martin Scorsese`,
    actors: `Leonardo DiCaprio, Cate Blanchett, and Kate Beckinsale`,
    runtime: `1h 39m`,
  },
  {
    previewImage: `img/we-need-to-talk-about-kevin.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `We need to talk about Kevin`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Thriller`,
    releaseDate: 2011,
    description: `Teenager Kevin Khatchadourian is in prison after committing a massacre at his high school. His mother, Eva, once a successful travel writer, lives alone in a rundown house and works in a travel agency near the prison, where she visits Kevin. She looks back at her memories of him growing up as she tries to cope with the hostility of her neighbors.`,
    rating: {
      score: 7.5,
      level: `Good`,
      count: 222,
    },
    director: `Lynne Ramsay`,
    actors: `Tilda Swinton, John C. Reilly, Ezra Miller`,
    runtime: `1h 39m`,
  },
  {
    previewImage: `img/what-we-do-in-the-shadows.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `What We Do in the Shadows`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `TV Series`,
    releaseDate: 2019,
    description: `A look into the daily (or rather, nightly) lives of three vampires, who've lived together for over 100 years, on Staten Island.`,
    rating: {
      score: 6.3,
      level: `Normal`,
      count: 198,
    },
    director: `Jemaine Clement`,
    actors: `Kayvan Novak, Matt Berry, Natasia Demetriou`,
    runtime: `1h 39m`,
  },
  {
    previewImage: `img/revenant.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Revenant`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Drama`,
    releaseDate: 2015,
    description: `In late 1823, Hugh Glass guides Captain Andrew Henry's trappers through the territory of the present-day Dakotas. While he and his half-Pawnee son, Hawk, are hunting, the company's camp is attacked by an Arikara war party seeking to recover their Chief's abducted daughter, Powaqa. Many of the trappers are killed during the fight, while the rest escape onto a boat. Guided by Glass, the survivors travel on foot to Fort Kiowa, as he believes traveling downriver will make them vulnerable. After docking, the crew stashes the pelts near the shore.`,
    rating: {
      score: 9.5,
      level: `Awesome`,
      count: 259,
    },
    director: `Alejandro González Iñárritu`,
    actors: `Leonardo DiCaprio, Tom Hardy, Domhnall Gleeson, Will Poulter`,
    runtime: `1h 39m`,
  },
  {
    previewImage: `img/johnny-english.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Johnny English`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Comedy`,
    releaseDate: 2003,
    description: `Johnny English is a kindhearted but inept MI7 employee, working a desk job while dreaming of being their most trusted agent. After Agent One dies in a submarine accident unknowingly caused by English, the remaining agents are killed by a bombing at Agent One's funeral, again due to English's incompetence, leaving English as the lone surviving agent capable of finishing Agent One’s mission.`,
    rating: {
      score: 2.2,
      level: `Bad`,
      count: 150,
    },
    director: `Peter Howitt`,
    actors: `Rowan Atkinson, Natalie Imbruglia, Ben Miller, John Malkovich`,
    runtime: `1h 39m`,
  },
];

const reviews = [
  {
    id: 1,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    author: `Kate Muir`,
    date: `December 24, 2016`,
    rating: 8.9,
  },
  {
    id: 2,
    text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    author: `Bill Goodykoontz`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 3,
    text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    author: `Amanda Greever`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 4,
    text: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    author: `Matthew Lickona`,
    date: `December 20, 2016`,
    rating: 7.2,
  },
  {
    id: 5,
    text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    author: `Paula Fleri-Soler`,
    date: `December 20, 2016`,
    rating: 7.6,
  },
  {
    id: 6,
    text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    author: `Paula Fleri-Soler`,
    date: `December 20, 2016`,
    rating: 7.0,
  },
];

const getGenresList = (moviesList) => {
  return [ALL_GENRES, ...new Set(moviesList.map((movie) => movie.genre))];
};

const getMoviesListByGenre = (genre) => movies.filter((movie) => movie.genre === genre);

const Genres = {
  DRAMA: `Drama`,
  COMEDY: `Comedy`,
  THRILLER: `Thriller`,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: ALL_GENRES,
    genresList: getGenresList(movies),
    promoMovie: PROMO_MOVIE,
    movies,
    reviews
  });
});

it(`Reducer should change current genre`, () => {
  expect(reducer({
    genre: ALL_GENRES,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: Genres.DRAMA,
  })).toEqual({
    genre: Genres.DRAMA,
  });

  expect(reducer({
    genre: Genres.THRILLER
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: Genres.COMEDY,
  })).toEqual({
    genre: Genres.COMEDY,
  });
});

it(`Reducer should change current movies list by a given genre`, () => {
  expect(reducer({
    movies,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: getMoviesListByGenre(Genres.DRAMA),
  })).toEqual({
    movies: getMoviesListByGenre(Genres.DRAMA)
  });

  expect(reducer({
    movies,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: getMoviesListByGenre(Genres.THRILLER),
  })).toEqual({
    movies: getMoviesListByGenre(Genres.THRILLER)
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct genre`, () => {
    expect(ActionCreator.changeGenre(Genres.COMEDY)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: Genres.COMEDY,
    });
  });

  it(`Action creator for getting movies by chosen genre returns correct movies list`, () => {
    expect(ActionCreator.getMoviesByGenre(Genres.THRILLER)).toEqual({
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: getMoviesListByGenre(Genres.THRILLER),
    });
  });
});
