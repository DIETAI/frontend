import { IDietEstablishmentMeal } from "interfaces/dietEstablishment.interfaces";
import { DinnerPortionsMacro } from "../portionsMacro/getDinnerPortionsMacro";

export const cartesianDinners = (
  mealEstablishment: IDietEstablishmentMeal,
  ...portions: DinnerPortionsMacro["dinnerProductsPortions"]
) => {
  const result: Array<ICartesianResult> = [];
  const max = portions.length - 1;

  const helper = (
    arr: DinnerPortionsMacro["dinnerProductsPortions"][0],
    i: number
  ) => {
    for (let j = 0, l = portions[i].length; j < l; j++) {
      const a = arr.slice(0); // clone arr
      a.push(portions[i][j]);
      if (i == max) {
        // result.push(a);
        //meal establishments uwzględnić przedziały
        //przy przedziałach nie trzeba tu liczyć missing procent tylko minMissingProcent  => przykład => dania
        const macroTotalCount = cartesianGroupTotalCount(a); //correct

        const missingProcentCount = cartesianGroupMissingProcentCount(
          macroTotalCount,
          mealEstablishment
        );

        const cartesianProductGroup = {
          products: a,
          macroTotalCount,
          missingProcentCount,
        };

        result.push(cartesianProductGroup);

        //poprawić (może brakować grup)
        // if (Math.abs(missingProcentCount.missingKcalProcent) <= 10) {
        //   result.push(cartesianProductGroup);
        // }

        //przy randomDinner obliczyć najwiekszą mozliwą porcje i najmniejszą jesli nie miesci sie w przedziale wylosowac ponownie
        // result.push(cartesianProductGroup);
      } else {
        helper(a, i + 1);
      }
    }
  };

  helper([], 0);

  return result;
};

type MacroForPortions = DinnerPortionsMacro["dinnerProductsPortions"][0];

const cartesianGroupTotalCount = (groups: MacroForPortions) => {
  const total_kcal = roundMacro(
    countCartesianMacroTotal(groups, "portionKcal")
  );
  const total_gram = roundMacro(countCartesianMacroTotal(groups, "portion"));
  const total_protein_gram = roundMacro(
    countCartesianMacroTotal(groups, "portionProteinGram")
  );
  const total_fat_gram = roundMacro(
    countCartesianMacroTotal(groups, "portionFatGram")
  );
  const total_carbohydrates_gram = roundMacro(
    countCartesianMacroTotal(groups, "portionCarbohydratesGram")
  );

  return {
    total_kcal,
    total_gram,
    total_protein_gram,
    total_fat_gram,
    total_carbohydrates_gram,
  };
};

type TotalMacro = ReturnType<typeof cartesianGroupTotalCount>;

const countCartesianMacroTotal = (
  groups: MacroForPortions,
  key: keyof MacroForPortions[0]
) => {
  const total = groups.reduce((acc, field) => acc + Number(field[key]), 0);
  return total;
};

export const cartesianGroupMissingProcentCount = (
  macroTotalCount: TotalMacro,
  mealEstablishment: IDietEstablishmentMeal
) => {
  const kcal = mealEstablishment.kcal;
  //   const proteinGram = mealEstablishment.protein.gram;
  //   const fatGram = mealEstablishment.fat.gram;
  //   const carbohydratesGram = mealEstablishment.carbohydrates.gram;

  const missingKcal = roundMacro(kcal - macroTotalCount.total_kcal);

  //   const missingProteinGram = roundMacro(
  //     proteinGram - macroTotalCount.total_protein_gram
  //   );

  //   const missingFatGram = roundMacro(fatGram - macroTotalCount.total_fat_gram);

  //   const missingCarbohydratesGram = roundMacro(
  //     carbohydratesGram - macroTotalCount.total_carbohydrates_gram
  //   );

  //missing procent
  const missingKcalProcent = roundMacro((missingKcal * 100) / kcal);

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

  return {
    missingKcal,
    // missingProteinGram,
    // missingFatGram,
    // missingCarbohydratesGram,
    // missingKcalProcent,
    // missingProteinProcent,
    // missingFatProcent,
    // missingCarbohydratesProcent,
    // missingAllMacroProcentSum: allMacroMissingProcent(),
  };
};

type MissingMacroProcent = ReturnType<typeof cartesianGroupMissingProcentCount>;

export const roundMacro = (macro: number) => {
  return Math.round(macro * 1e2) / 1e2;
};

export interface ICartesianResult {
  products: MacroForPortions;
  macroTotalCount: TotalMacro;
  missingProcentCount: MissingMacroProcent;
}
