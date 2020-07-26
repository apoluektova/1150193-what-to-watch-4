export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getTimeLeft = (videoDuration) => {
  const seconds = Math.trunc(videoDuration % 60);
  const minutes = Math.trunc(videoDuration / 60);
  const hours = Math.trunc(minutes / 60);

  return [
    (`0` + hours).slice(-2),
    (`0` + minutes).slice(-2),
    (`0` + seconds).slice(-2)
  ].join(`:`);
};

export const getRatingLevel = (count) => {
  if (count >= 0 && count < 3) {
    return `Bad`;
  }
  if (count <= 3 && count < 5) {
    return `Normal`;
  }
  if (count <= 5 && count < 8) {
    return `Good`;
  }
  if (count <= 8 && count < 10) {
    return `Very good`;
  }
  if (count >= 10) {
    return `Awesome`;
  }

  return ``;
};

export const formatRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const filmRuntime = `${hours}h ${minutes}m`;
  return filmRuntime;
};


