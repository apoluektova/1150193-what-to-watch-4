import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {initialState, reducer, ActionType, Operation} from "./data.js";
import {createMovie, createMovies} from "../../adapter/movies.js";

const api = createAPI(() => {});

const PROMO_MOVIE = {
  id: 1,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  title: `The Grand Budapest Hotel`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#A6B7AC`,
  poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
  genre: `Drama`,
  releaseDate: 2014,
  description: `The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson, which explores tragedy, war, fascism, nostalgia, friendship, and loyalty.`,
  rating: {
    score: 9.3,
    count: 250,
  },
  director: `Wes Anderson`,
  actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
  runtime: `1h 39m`,
  isFavorite: false,
};

const testMovies = [
  {
    id: 1,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49876816733_f1ba86707f_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49824720108_18907b74af_z_273_410_nofilter.jpg`,
    genre: `Fantasy`,
    releaseDate: 2018,
    description: `The plot follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.`,
    rating: {
      score: 8.9,
      count: 240,
    },
    director: `David Yates`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 2,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Bohemian Rhapsody`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49768198796_957c97bc00_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_50001660108_922f0950ea_z_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 2018,
    description: `A British-American venture, the film was produced by 20th Century Fox, Regency Enterprises, GK Films, and Queen Films, with Fox serving as distributor. The film follows the singer's life from the formation of the band up to their 1985 Live Aid performance at the original Wembley Stadium.`,
    rating: {
      score: 9.0,
      count: 250,
    },
    director: `Bryan Singer`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 3,
    previewImage: `img/macbeth.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Macbeth`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49757902562_3b737630e4_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49816709832_c9df27e040_z_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 2015,
    description: `The story follows a Scottish general's rise to power after receiving a prophecy from a trio of witches that one day he will become King of Scotland. Like the play it was adapted from, the film dramatises the damaging physical and psychological effects of political ambition on those who seek power for its own sake.`,
    rating: {
      score: 8.0,
      count: 234,
    },
    director: `Justin Kurzel`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 4,
    previewImage: `img/aviator.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Aviator`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49800111821_ae7805f489_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_50063687282_2595a7661e_z_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 2004,
    description: `Based on the 1993 non-fiction book Howard Hughes: The Secret Life by Charles Higham, the film depicts the life of Howard Hughes, an aviation pioneer and director of Hell's Angels. The film portrays his life from 1927–1947 during which time Hughes became a successful film producer and an aviation magnate while simultaneously growing more unstable due to severe obsessive–compulsive disorder (OCD).`,
    rating: {
      score: 8.7,
      count: 241,
    },
    director: `Martin Scorsese`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 5,
    previewImage: `img/we-need-to-talk-about-kevin.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `We need to talk about Kevin`,
    backgroundImage: `https://loremflickr.com/cache/resized/110_298884155_4812a1357a_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49933319523_2efc20f016_z_273_410_nofilter.jpg`,
    genre: `Thriller`,
    releaseDate: 2011,
    description: `Teenager Kevin Khatchadourian is in prison after committing a massacre at his high school. His mother, Eva, once a successful travel writer, lives alone in a rundown house and works in a travel agency near the prison, where she visits Kevin. She looks back at her memories of him growing up as she tries to cope with the hostility of her neighbors.`,
    rating: {
      score: 7.5,
      count: 222,
    },
    director: `Lynne Ramsay`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 6,
    previewImage: `img/what-we-do-in-the-shadows.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `What We Do in the Shadows`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_50025217883_22ddf75ead_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49772471181_9e8e665242_z_273_410_nofilter.jpg`,
    genre: `TV Series`,
    releaseDate: 2019,
    description: `A look into the daily (or rather, nightly) lives of three vampires, who've lived together for over 100 years, on Staten Island.`,
    rating: {
      score: 6.3,
      count: 198,
    },
    director: `Jemaine Clement`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 7,
    previewImage: `img/revenant.jpg`,
    previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    title: `Revenant`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_50017020951_55c8a0c6c3_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49999007532_ac3022773f_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 2015,
    description: `In late 1823, Hugh Glass guides Captain Andrew Henry's trappers through the territory of the present-day Dakotas. While he and his half-Pawnee son, Hawk, are hunting, the company's camp is attacked by an Arikara war party seeking to recover their Chief's abducted daughter, Powaqa. Many of the trappers are killed during the fight, while the rest escape onto a boat. Guided by Glass, the survivors travel on foot to Fort Kiowa, as he believes traveling downriver will make them vulnerable. After docking, the crew stashes the pelts near the shore.`,
    rating: {
      score: 9.5,
      count: 259,
    },
    director: `Alejandro González Iñárritu`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 8,
    previewImage: `img/johnny-english.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Johnny English`,
    backgroundImage: `https://loremflickr.com/cache/resized/1293_988680611_baf31fb71f_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49780216106_64a2df886f_273_410_nofilter.jpg`,
    genre: `Comedy`,
    releaseDate: 2003,
    description: `Johnny English is a kindhearted but inept MI7 employee, working a desk job while dreaming of being their most trusted agent. After Agent One dies in a submarine accident unknowingly caused by English, the remaining agents are killed by a bombing at Agent One's funeral, again due to English's incompetence, leaving English as the lone surviving agent capable of finishing Agent One’s mission.`,
    rating: {
      score: 2.2,
      count: 150,
    },
    director: `Peter Howitt`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 9,
    previewImage: `img/shutter-island.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Shutter Island`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49805957881_02861e1b87_k_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49893876713_6f84caeef0_z_273_410_nofilter.jpg`,
    genre: `Thriller`,
    releaseDate: 2010,
    description: ` Leonardo DiCaprio stars as U.S. Marshal Edward "Teddy" Daniels, who is investigating a psychiatric facility on Shutter Island after one of the patients goes missing. Mark Ruffalo plays his partner officer; Ben Kingsley is the facility's lead psychiatrist; Max von Sydow is a German doctor; and Michelle Williams is Daniels's wife. `,
    rating: {
      score: 8.6,
      count: 189,
    },
    director: `Martin Scorsese`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 45m`,
    isFavorite: false,
  },
  {
    id: 10,
    previewImage: `img/pulp-fiction.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Pulp Fiction`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49579232627_490b447655_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49956829783_580584fe83_z_273_410_nofilter.jpg`,
    genre: `Crime`,
    releaseDate: 1994,
    description: `Pulp Fiction is a 1994 American independent neo-noir crime film written and directed by Quentin Tarantino, who conceived it with Roger Avary. Starring John Travolta, Samuel L. Jackson, Bruce Willis, Tim Roth, Ving Rhames, and Uma Thurman, it tells several stories of criminal Los Angeles.`,
    rating: {
      score: 9.8,
      count: 276,
    },
    director: `Quentin Tarantino`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 19m`,
    isFavorite: false,
  },
  {
    id: 11,
    previewImage: `img/no-country-for-old-men.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `No Country for Old Men`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49845303721_0bd458d515_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/6122_5965544405_3258efc860_z_273_410_nofilter.jpg`,
    genre: `Crime`,
    releaseDate: 2007,
    description: `No Country for Old Men is a 2007 American neo-Western crime thriller film written and directed by Joel and Ethan Coen, based on Cormac McCarthy's 2005 novel of the same name. A cat-and-mouse thriller starring Tommy Lee Jones, Javier Bardem, and Josh Brolin, it follows a Texas welder and Vietnam War veteran in the desert landscape of 1980 West Texas`,
    rating: {
      score: 8.5,
      count: 145,
    },
    director: `Joel and Ethan Coen`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `2h 39m`,
    isFavorite: false,
  },
  {
    id: 12,
    previewImage: `img/snatch.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Snatch`,
    backgroundImage: `https://loremflickr.com/cache/resized/276_18146902003_f7fbc1d6ef_k_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/6139_5968403489_d02879dc88_z_273_410_nofilter.jpg`,
    genre: `Comedy`,
    releaseDate: 2000,
    description: `Set in the London criminal underworld, the film contains two intertwined plots: one dealing with the search for a stolen diamond, the other with a small-time boxing promoter (Jason Statham) who finds himself under the thumb of a ruthless gangster (Alan Ford) who is ready and willing to have his subordinates carry out severe and sadistic acts of violence.`,
    rating: {
      score: 9.3,
      count: 189,
    },
    director: `Guy Ritchie`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 23m`,
    isFavorite: false,
  },
  {
    id: 13,
    previewImage: `img/moonrise-kingdom.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Moonrise Kingdom`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49922774342_5f0b92962c_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49788248126_670251524a_z_273_410_nofilter.jpg`,
    genre: `Comedy`,
    releaseDate: 2012,
    description: ` Largely set on the fictional New England island of New Penzance, it tells the story of an orphan boy (Gilman) who escapes from a scouting camp to unite with his pen pal and love interest, a girl with aggressive tendencies (Hayward). Feeling alienated from their guardians and shunned by their peers, the lovers abscond to an isolated beach. Meanwhile, the island's police captain (Willis) organizes a search party of scouts and family members to locate the runaways.`,
    rating: {
      score: 6.5,
      count: 109,
    },
    director: `Wes Anderson`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 42m`,
    isFavorite: false,
  },
  {
    id: 14,
    previewImage: `img/seven-years-in-tibet.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Seven Years in Tibet`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49934499233_86266d8ef8_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49768198796_56e05cbfcb_z_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 1997,
    description: `even Years in Tibet is a 1997 American biographical war drama film based on the 1952 book of the same name written by Austrian mountaineer Heinrich Harrer on his experiences in Tibet between 1939 and 1951 during World War II, the interim period, and the Chinese People's Liberation Army's invasion of Tibet in 1950.`,
    rating: {
      score: 8.1,
      count: 167,
    },
    director: `Heinrich Harrer`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 15,
    previewImage: `img/midnight-special.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Midnight Special`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_50010186487_0233b87cf9_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49815343191_bf494f7cc0_z_273_410_nofilter.jpg`,
    genre: `Sci-Fi`,
    releaseDate: 2016,
    description: `The story revolves around Roy Tomlin and his biological son, Alton Meyer, escaping from both the government and a cult, after discovering that Alton has special powers. The film began a theatrical release on March 18, 2016, by Warner Bros. Pictures, expanding wider in subsequent weeks.`,
    rating: {
      score: 7.3,
      count: 164,
    },
    director: `Jeff Nichols`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 34m`,
    isFavorite: false,
  },
  {
    id: 16,
    previewImage: `img/war-of-the-worlds.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `War of the Worlds`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49876826728_bc735163d7_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49824725871_4f538759aa_z_273_410_nofilter.jpg`,
    genre: `Sci-Fi`,
    releaseDate: 2005,
    description: `The film follows an American dock worker who is forced to look after his children, from whom he lives separately, as he struggles to protect them and reunite them with their mother when extraterrestrials invade the Earth and devastate cities with giant war machines. This was Gene Barry's final film before his retirement that year and his death in 2009.`,
    rating: {
      score: 8.7,
      count: 256,
    },
    director: `Steven Spielberg`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 20m`,
    isFavorite: false,
  },
  {
    id: 17,
    previewImage: `img/dardjeeling-limited.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Dardjeeling Limited`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49816477696_5d540d284d_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49824715478_c4ce4dcc45_z_273_410_nofilter.jpg`,
    genre: `Comedy`,
    releaseDate: 2007,
    description: `The film stars Owen Wilson, Adrien Brody and Schwartzman as three estranged brothers who agree to meet in India a year after their father's funeral for a "spiritual journey" aboard a luxury train.`,
    rating: {
      score: 9.9,
      count: 300,
    },
    director: `Wes Anderson`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 15m`,
    isFavorite: false,
  },
  {
    id: 18,
    previewImage: `img/orlando.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Orlando`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_49718325341_005cb7f8da_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_49914512997_82d29e719a_z_273_410_nofilter.jpg`,
    genre: `Drama`,
    releaseDate: 1992,
    description: `Orlando is a 1992 British period drama film loosely based on Virginia Woolf's 1928 novel Orlando: A Biography, starring Tilda Swinton as Orlando, Billy Zane as Marmaduke Bonthrop Shelmerdine, and Quentin Crisp as Queen Elizabeth I. It was written and directed by Sally Potter, who also co-wrote the music for the film (with David Motion).`,
    rating: {
      score: 7.6,
      count: 134,
    },
    director: `Sally Potter`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 25m`,
    isFavorite: false,
  },
  {
    id: 19,
    previewImage: `img/mindhunter.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Mindhunter`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_50009600911_ad11c074d2_h_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_50010186487_6ab2127184_z_273_410_nofilter.jpg`,
    genre: `TV Series`,
    releaseDate: 2017,
    description: `Set in the late 1970s, two FBI agents are tasked with interviewing serial killers to solve open cases.`,
    rating: {
      score: 9.0,
      count: 166,
    },
    director: `Joe Penhall`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
  {
    id: 20,
    previewImage: `img/midnight-special.jpg`,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Midnight Special`,
    backgroundImage: `https://loremflickr.com/cache/resized/65535_50050741233_e3876968ac_k_1280_543_nofilter.jpg`,
    backgroundColor: `#A6B7AC`,
    poster: `https://loremflickr.com/cache/resized/65535_50057389481_0fea595cb5_z_273_410_nofilter.jpg`,
    genre: `Sci-Fi`,
    releaseDate: 2016,
    description: `The story revolves around Roy Tomlin and his biological son, Alton Meyer, escaping from both the government and a cult, after discovering that Alton has special powers. The film began a theatrical release on March 18, 2016, by Warner Bros. Pictures, expanding wider in subsequent weeks.`,
    rating: {
      score: 8.8,
      count: 199,
    },
    director: `Jeff Nichols`,
    actors: [`Michael Fassbender`, `Marion Cotillard`, `Paddy Considine`, `Sean Harris`],
    runtime: `1h 39m`,
    isFavorite: false,
  },
];

const testReviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `Kate Muir`,
    },
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `December 24, 2016`,
    rating: 8.9,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: `Bill Goodykoontz`,
    },
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 3,
    user: {
      id: 3,
      name: `Amanda Greever`,
    },
    comment: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    date: `November 18, 2015`,
    rating: 8.0,
  },
  {
    id: 4,
    user: {
      id: 4,
      name: `Matthew Lickona`,
    },
    comment: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    date: `December 20, 2016`,
    rating: 7.2,
  },
  {
    id: 5,
    user: {
      id: 5,
      name: `Paula Fleri-Soler`,
    },
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: `December 20, 2016`,
    rating: 7.6,
  },
  {
    id: 6,
    user: {
      id: 6,
      name: `Paula Fleri-Soler`,
    },
    comment: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    date: `December 20, 2016`,
    rating: 7.0,
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: testMovies,
  })).toEqual({
    movies: testMovies,
  });
});

it(`Reducer should load promo movie`, () => {
  expect(reducer({
    promoMovie: {},
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: PROMO_MOVIE,
  })).toEqual({
    promoMovie: PROMO_MOVIE,
  });
});

it(`Reducer should load reviews`, () => {
  expect(reducer({
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: testReviews,
  })).toEqual({
    reviews: testReviews,
  });
});

it(`Reducer should catch errors`, () => {
  expect(reducer({
    isError: false,
  }, {
    type: ActionType.CATCH_ERROR,
    payload: true,
  })).toEqual({
    isError: true,
  });
});

it(`Reducer should load favorite movies`, () => {
  expect(reducer({
    favoriteMovies: [],
  }, {
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: testMovies,
  })).toEqual({
    favoriteMovies: testMovies
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
    .onGet(`/films`)
    .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_MOVIES,
          payload: createMovies([{fake: true}]),
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoMovieLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_PROMO_MOVIE,
              payload: createMovie({fake: true}),
            });
          });
  });

  it(`Should make a correct API call to /comments/1`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_REVIEWS,
              payload: [{fake: true}],
            });
          });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteMoviesLoader = Operation.loadFavoriteMovies();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoriteMoviesLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_FAVORITE_MOVIES,
              payload: [createMovie({fake: true})],
            });
          });
  });
});
