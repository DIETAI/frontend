export const cpmHelper = (ppmHarris: number, pal: number) => {
  return Math.round(ppmHarris * pal * 1e2) / 1e2;
};
