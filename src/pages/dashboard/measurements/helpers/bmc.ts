//Lean body mass LBM [eng] Beztłuszczowa masa ciała BMC
export const BMCHelper = (
  height?: number,
  weight?: number,
  sex?: "mężczyzna" | "kobieta"
) => {
  if (!sex || !weight || !height) {
    return 0;
  }
  if (sex === "mężczyzna") {
    const BMC = 1.1 * weight - 128 * ((weight / height) ^ 2);
    return Math.round(BMC * 1e2) / 1e2;
  } else if (sex === "kobieta") {
    const BMC = 1.07 * weight - 148 * ((weight / height) ^ 2);
    return Math.round(BMC * 1e2) / 1e2;
  }

  return 0;
};
