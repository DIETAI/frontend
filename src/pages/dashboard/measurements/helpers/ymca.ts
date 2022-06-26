//Procentowa zawartość tkanki tłuszczowej w organizmie
export const YMCAHelper = (
  waist: number,
  weight: number,
  sex: "male" | "female"
) => {
  if (sex === "male") {
    const YMCA =
      ((1.634 * waist - 0.1804 * weight - 98.42) / (2.2 * weight)) * 100;
    return Math.round(YMCA * 1e2) / 1e2;
  } else if (sex === "female") {
    const YMCA =
      ((1.634 * waist - 0.1804 * weight - 76.76) / (2.2 * weight)) * 100;
    return Math.round(YMCA * 1e2) / 1e2;
  }

  return 0;
};
