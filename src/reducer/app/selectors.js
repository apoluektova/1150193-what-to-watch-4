import NameSpace from "../name-space.js";

export const getGenre = (state) => {
  return state[NameSpace.APP].genre;
};

export const getShownMovieCards = (state) => {
  return state[NameSpace.APP].shownMovieCards;
};

export const getCurrentMovieCard = (state) => {
  return state[NameSpace.APP].currentMovieCard;
};

export const getIsFullScreenOn = (state) => {
  return state[NameSpace.APP].isFullScreenOn;
};

export const getIsReviewOpen = (state) => {
  return state[NameSpace.APP].isReviewOpen;
};

export const getIsFormDisabled = (state) => {
  return state[NameSpace.APP].isFormDisabled;
};


