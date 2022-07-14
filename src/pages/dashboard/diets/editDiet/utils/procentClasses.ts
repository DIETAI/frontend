interface IProcentClasses {
  establishment: number;
  total: number;
}

export const procentClasses = ({ establishment, total }: IProcentClasses) => {
  const currentProcent = (total * 100) / establishment;
  const missingProcent = Math.abs(100 - currentProcent);

  //procent
  if (missingProcent >= 50) {
    return "red";
  }

  if (missingProcent <= 5) {
    return "green";
  }
  return "yellow";
};
