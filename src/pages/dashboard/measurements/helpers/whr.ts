export const WHRHelper = (waist: number, hip: number) => {
  const WHR = waist / hip;
  return Math.round(WHR * 1e2) / 1e2;
};

// waist to height ratio [eng] wskaźnik talia [cm] / wzrost [cm]  (pl)
export const WHtRHelper = (waist: number, height: number) => {
  const WHtR = (waist / height) * 100;
  return Math.round(WHtR * 1e2) / 1e2;
};
