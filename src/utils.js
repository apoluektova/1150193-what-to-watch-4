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


