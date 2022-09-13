import { RandomMeal } from "../randomDietMeal/randomDietMeal";
import { countMacroPortion } from "helpers/countMacroPortion";

export const getMealDinnersPortionsMacro = (
  randomMealDinner: RandomMeal["randomDietMeal"]["dinners"][0]
) => {
  const dinnerProductsPortions = randomMealDinner.dinnerProducts.map(
    ({ dinnerId, defaultAmount, portionsGram, product }) => {
      //getProduct by productId aby obliczyć makro dla każdej porcji

      const macroForPortions = portionsGram.map((portionGram) => {
        const portionMacro = countMacroPortion(portionGram, product);
        return portionMacro;
      });

      return macroForPortions.map((macroPortion) => ({
        ...macroPortion,
        dinnerId,
        dietDinnerId: randomMealDinner._id,
      }));
    }
  );

  const randomDinnerWithPortions = {
    ...randomMealDinner,
    dinnerProductsPortions,
  };

  return randomDinnerWithPortions;
};

export type DinnerPortionsMacro = ReturnType<
  typeof getMealDinnersPortionsMacro
>;

// const countMacroForPortions = (
//   productPortions: number[],
//   productObj: IProduct
// ) => {
//   const portionMacro = productPortions.map((portion) => {
//     const portionProteinGram = (portion * productObj.proteinGram) / 100;
//     const portionProteinKcal = portionProteinGram * 4;

//     const portionFatGram = (portion * productObj.fatGram) / 100;
//     const portionFatKcal = portionFatGram * 9;

//     const portionCarbohydratesGram =
//       (portion * productObj.carbohydratesGram) / 100;
//     const portionCarbohydratesKcal = portionCarbohydratesGram * 4;

//     const portionKcal =
//       portionProteinKcal + portionFatKcal + portionCarbohydratesKcal;

//     return {
//       productId: productObj.id,
//       productName: productObj.name,
//       portion,
//       portionKcal: roundMacro(portionKcal),
//       portionProteinGram: roundMacro(portionProteinGram),
//       portionProteinKcal: roundMacro(portionProteinKcal),
//       portionFatGram: roundMacro(portionFatGram),
//       portionFatKcal: roundMacro(portionFatKcal),
//       portionCarbohydratesGram: roundMacro(portionCarbohydratesGram),
//       portionCarbohydratesKcal: roundMacro(portionCarbohydratesKcal),
//     };
//   });

//   return portionMacro;
// };

// const roundMacro = (macro: number) => {
//   return Math.round(macro * 1e2) / 1e2;
// };
