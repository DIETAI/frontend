import { IDietMealData } from "interfaces/diet/dietMeals.interfaces";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
//functions
import { randomDietMeal } from "./randomDietMeal/randomDietMeal";

export interface IGenerateDietMeal {
  allDietMeals: IDietMealData[];
  mealToGenerate: IDietMealQueryData;
}

export const generateMeal = async ({
  allDietMeals,
  mealToGenerate,
}: IGenerateDietMeal) => {
  const generate = new Promise((resolve) => {
    setTimeout(() => {
      console.log("generate diet meal");

      const filteredDietMealsByType = allDietMeals.filter(
        ({ type }) => type === mealToGenerate.type
      );

      const randomMeal = randomDietMeal({
        mealType: mealToGenerate.type,
        filteredDietMealsByType,
      });

      //    const mealsDinnersPortionsMacro = randomDayMeals.map(
      //      ({ randomDietMeal }) => {
      //        const dinnerPortionsMacro = randomDietMeal.dinners.map((dinner) => {
      //          const dinnerMacroPortion = getMealDinnersPortionsMacro(dinner);

      //          return {
      //            ...dinner,
      //            dinnerMacroPortion,
      //          };
      //        });

      //        return {
      //          ...randomDietMeal,
      //          dinnerPortionsMacro,
      //        };
      //      }
      //    );

      //    const mealDinners = mealsDinnersPortionsMacro.map((meal) => {
      //      const allMealDinnerProductsWithPortions = meal.dinnerPortionsMacro.map(
      //        ({ dinnerMacroPortion }) => {
      //          const portions = dinnerMacroPortion.dinnerProductsPortions;

      //          return portions;
      //        }
      //      );

      //      console.log({ allMealDinnerProductsWithPortions });

      //      const concatMealDinnersPortions =
      //        allMealDinnerProductsWithPortions.flatMap(
      //          (mealDinners) => mealDinners
      //        );

      //      console.log({ concatMealDinnersPortions });

      //      //złączenie wszystkich produktów w posiłku (odróżnienie za pomocą dinnerId)
      //      //concatMealDinners => algorytm kartezjański

      //      return {
      //        ...meal,
      //        concatMealDinnersPortions,
      //      };
      //    });

      //    console.time("cartesianProduct");
      //    // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)

      //    const dinnersCartesianGroups = mealDinners.map((meal) => ({
      //      mealId: meal._id,
      //      mealName: meal.name,
      //      mealsType: meal.type,
      //      mealEstablishment: meal.mealEstablishment,
      //      groups: cartesianDinners(
      //        meal.mealEstablishment, //get establishment
      //        meal.dietEstablishment,
      //        ...meal.concatMealDinnersPortions
      //      ),
      //    }));
      //    console.timeEnd("cartesianProduct");

      //    const selectedDinners = dinnersCartesianGroups.map((meal) => ({
      //      mealId: meal.mealId,
      //      mealName: meal.mealName,
      //      groups: selectGroups(meal.groups),
      //    }));

      //    console.log({
      //      currentDayId,
      //      randomDayMeals,
      //      mealsDinnersPortionsMacro,
      //      mealDinners,
      //      dinnersCartesianGroups,
      //      selectedDinners,
      //    });

      return resolve(randomMeal);
    }, 2000);
  });

  return generate;
};
