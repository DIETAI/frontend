export const ppmHelper = (
  sex: "male" | "female",
  weight: number,
  height: number,
  age: number
) => {
  if (sex === "male") {
    const ppm_harris =
      Math.round((66.5 + 13.75 * weight + 5.003 * height - 6.775 * age) * 1e2) /
      1e2;
    const ppm_mifflin =
      Math.round((10 * weight + 6.25 * height - 5 * age + 5) * 1e2) / 1e2;
    return { ppm_harris, ppm_mifflin };
  } else if (sex === "female") {
    const ppm_harris =
      Math.round((655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) * 1e2) /
      1e2;
    const ppm_mifflin =
      Math.round((10 * weight + 6.25 * height - 5 * age - 161) * 1e2) / 1e2;
    return { ppm_harris, ppm_mifflin };
  }

  return { ppm_harris: 0, ppm_mifflin: 0 };
};
