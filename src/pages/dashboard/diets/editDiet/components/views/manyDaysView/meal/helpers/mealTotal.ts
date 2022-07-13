import { IDietMealTotal } from "interfaces/diet/dietMeals.interfaces";
import { IDietDinnerQueryData } from "interfaces/diet/dietDinners.interfaces";

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

interface ISumTotal {
  dietDinners: IDietDinnerQueryData[];
  dietDayTotalKcal: number;
}

export const sumDietDinnersTotal = ({
  dietDinners,
  dietDayTotalKcal,
}: ISumTotal) => {
  const kcal = roundValue(
    dietDinners.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.kcal),
      0
    )
  );

  //protein
  const proteinGram = roundValue(
    dietDinners.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.protein.gram),
      0
    )
  );

  const proteinKcal = roundValue(
    dietDinners.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.protein.kcal),
      0
    )
  );

  const proteinProcent = roundValue((proteinKcal * 100) / kcal);

  //fat
  const fatGram = roundValue(
    dietDinners.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fat.gram),
      0
    )
  );

  const fatKcal = roundValue(
    dietDinners.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fat.kcal),
      0
    )
  );

  const fatProcent = roundValue((fatKcal * 100) / kcal);

  //carbohydrates
  const carbohydratesGram = roundValue(
    dietDinners.reduce(
      (acc, field) =>
        acc + Number(field.dinnerPortion.total.carbohydrates.gram),
      0
    )
  );

  const carbohydratesKcal = roundValue(
    dietDinners.reduce(
      (acc, field) =>
        acc + Number(field.dinnerPortion.total.carbohydrates.kcal),
      0
    )
  );

  const carbohydratesProcent = roundValue((carbohydratesKcal * 100) / kcal);

  //fiber
  const fiberGram = roundValue(
    dietDinners.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fiber.gram),
      0
    )
  );

  const fiberKcal = roundValue(
    dietDinners.reduce(
      (acc, field) => acc + Number(field.dinnerPortion.total.fiber.kcal),
      0
    )
  );

  const mealTotal: IDietMealTotal = {
    kcal,
    procent: roundValue((kcal * 100) / dietDayTotalKcal),
    protein: {
      gram: proteinGram,
      kcal: proteinKcal,
      procent: proteinProcent,
    },
    fat: {
      gram: fatGram,
      kcal: fatKcal,
      procent: fatProcent,
    },
    carbohydrates: {
      gram: carbohydratesGram,
      kcal: carbohydratesKcal,
      procent: carbohydratesProcent,
    },
    fiber: {
      gram: fiberGram,
      kcal: fiberKcal,
    },
  };

  return mealTotal;
};
