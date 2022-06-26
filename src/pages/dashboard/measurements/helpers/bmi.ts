export const bmiHelper = (weight: number, height: number) => {
  const bmi = Math.round((weight / (height / 100) ** 2) * 1e2) / 1e2;
  return bmi;
};

export const bmiTypeHelper = (bmi: number) => {
  if (bmi <= 18.5) return "niedowaga";
  if (bmi > 18.5 && bmi <= 24.9) return "norma";
  if (bmi > 24.9 && bmi <= 29.9) return "nadwaga";
  if (bmi > 29.9) return "otyłość";
  return "brak";
};
