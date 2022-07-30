// import { DietDays } from "../../helpers/createDays";
// import { PortionMacroDinners } from "./dinnerPortionsMacro";

import { IDinnerProductQuery } from "interfaces/dinner/dinnerPortions.interfaces";
import { v4 as uuidv4 } from "uuid";

interface ICartesianPortion {
  _id: string;
  portionGram: number;
}

export const cartesianPortions = (
  //   mealEstablishments: DietDays["meals"][0]["establishments"],
  //   ...portions: number[][];
  ...portions: ICartesianPortion[][]
) => {
  const result: Array<ICartesianResult> = [];
  const max = portions.length - 1;

  const helper = (
    arr: ICartesianPortion[],
    // arr: number[],
    i: number
  ) => {
    for (let j = 0, l = portions[i].length; j < l; j++) {
      const a = arr.slice(0); // clone arr
      a.push(portions[i][j]);
      if (i == max) {
        // result.push(a);

        // const macroTotalCount = cartesianGroupTotalCount(a); //correct

        // const missingProcentCount = cartesianGroupMissingProcentCount(
        //   macroTotalCount,
        //   mealEstablishments
        // );

        const cartesianProductGroup = {
          products: a,
          uid: uuidv4(),
          //   macroTotalCount,
          //   missingProcentCount,
        };

        result.push(cartesianProductGroup);
      } else {
        helper(a, i + 1);
      }
    }
  };

  helper([], 0);

  return result;
};

// type MacroForPortions = PortionMacroDinners["dinnerProductsPortions"][0];

// const cartesianGroupTotalCount = (groups: MacroForPortions) => {
//   const total_kcal = roundMacro(
//     countCartesianMacroTotal(groups, "portionKcal")
//   );
//   const total_gram = roundMacro(countCartesianMacroTotal(groups, "portion"));
//   const total_protein_gram = roundMacro(
//     countCartesianMacroTotal(groups, "portionProteinGram")
//   );
//   const total_fat_gram = roundMacro(
//     countCartesianMacroTotal(groups, "portionFatGram")
//   );
//   const total_carbohydrates_gram = roundMacro(
//     countCartesianMacroTotal(groups, "portionCarbohydratesGram")
//   );

//   return {
//     total_kcal,
//     total_gram,
//     total_protein_gram,
//     total_fat_gram,
//     total_carbohydrates_gram,
//   };
// };

// type TotalMacro = ReturnType<typeof cartesianGroupTotalCount>;

// const countCartesianMacroTotal = (
//   groups: MacroForPortions,
//   key: keyof MacroForPortions[0]
// ) => {
//   const total = groups.reduce((acc, field) => acc + Number(field[key]), 0);
//   return total;
// };

// export const cartesianGroupMissingProcentCount = (
//   macroTotalCount: TotalMacro,
//   mealEstablishments: DietDays["meals"][0]["establishments"]
// ) => {
//   const kcal = mealEstablishments.kcal;
//   const proteinGram = mealEstablishments.protein.gram;
//   const fatGram = mealEstablishments.fat.gram;
//   const carbohydratesGram = mealEstablishments.carbohydrates.gram;

//   const missingKcal = roundMacro(kcal - macroTotalCount.total_kcal);

//   const missingProteinGram = roundMacro(
//     proteinGram - macroTotalCount.total_protein_gram
//   );

//   const missingFatGram = roundMacro(fatGram - macroTotalCount.total_fat_gram);

//   const missingCarbohydratesGram = roundMacro(
//     carbohydratesGram - macroTotalCount.total_carbohydrates_gram
//   );

//   //missing procent
//   const missingKcalProcent = roundMacro((missingKcal * 100) / kcal);

//   const missingProteinProcent = roundMacro(
//     (missingProteinGram * 100) / proteinGram
//   );

//   const missingFatProcent = roundMacro((missingFatGram * 100) / fatGram);
//   const missingCarbohydratesProcent = roundMacro(
//     (missingCarbohydratesGram * 100) / carbohydratesGram
//   );

//   const allMacroMissingProcent = () => {
//     const sum =
//       Math.abs(missingProteinProcent) +
//       Math.abs(missingFatProcent) +
//       Math.abs(missingCarbohydratesProcent);

//     return sum;
//   };

//   return {
//     missingKcal,
//     missingProteinGram,
//     missingFatGram,
//     missingCarbohydratesGram,
//     missingKcalProcent,
//     missingProteinProcent,
//     missingFatProcent,
//     missingCarbohydratesProcent,
//     missingAllMacroProcentSum: allMacroMissingProcent(),
//   };
// };

// type MissingMacroProcent = ReturnType<typeof cartesianGroupMissingProcentCount>;

// export const roundMacro = (macro: number) => {
//   return Math.round(macro * 1e2) / 1e2;
// };

export interface ICartesianResult {
  //   products: MacroForPortions;
  products: ICartesianPortion[];
  uid: string;
  //   macroTotalCount: TotalMacro;
  //   missingProcentCount: MissingMacroProcent;
}
