import {
  IDietDayMealData,
  IDietMealData,
  IDietMealDinner,
} from "interfaces/diet/dietMeals.interfaces";

//helpers
import { randomDietMeal } from "./randomDietMeal/randomDietMeal";
import { getMealDinnersPortionsMacro } from "./portionsMacro/getDinnerPortionsMacro";
import { cartesianDinners } from "./cartesianDinners/cartesianDinners";
import { selectGroups } from "./selectGroups";

export interface IGenerateDiet {
  days: string[];
  allDietMeals: IDietMealData[];
  generateMealsSettings:
    | "changeAmountAddedMeals"
    | "saveAddedMeals"
    | "newMeals";
  meals: {
    uid: string;
    type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  }[];
}

export const generateDiet = async ({
  days,
  generateMealsSettings,
  meals,
  allDietMeals,
}: IGenerateDiet) => {
  const generatedLoopDays = [];

  for (const [index, dayId] of days.entries()) {
    console.log(`Generowanie diety dla dnia ${dayId}`);
    // changeDietGenerateAction(
    //   day,
    //   true,
    //   "wybieranie posiłków",
    //   generatedLoopDays
    // );

    // const currentDay = dietDays.filter(({ id }) => id === day)[0];
    // const dayMeals = meals.filter(({ dayId }) => dayId === day);

    //znaleść najbardziej pasujący dietDayMealObject z już dodanych diet admina i wyszukać wszystkie dostępne dinner portions
    // => najpierw wyszukanie najlepszego dietMeal w algorytmie rekomendacji
    // => później wybranie idealnego zestawu porcji
    const generatedDietDayMeals = await generateDietDay({
      currentDayId: dayId,
      mealsTypes: meals,
      allDietMeals,
    });

    console.log({ generatedDietDayMeals });

    if (dayId === days[days.length - 1]) {
      // return changeDietGenerateAction(0, false, "", [0]);

      return false;
    }

    generatedLoopDays.push(dayId);
    //   changeDietGenerateAction(0, false, "", generatedLoopDays);
  }
};

export interface IGenerateDietDay {
  allDietMeals: IDietMealData[];
  currentDayId: string;
  mealsTypes: {
    uid: string;
    type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  }[];
}

const generateDietDay = async ({
  currentDayId,
  mealsTypes,
  allDietMeals,
}: IGenerateDietDay) => {
  const generate = new Promise((resolve) => {
    setTimeout(() => {
      console.log("generate diet day");

      const randomDayMeals = mealsTypes.map((meal) => {
        const filteredDietMealsByType = allDietMeals.filter(
          ({ type }) => type === meal.type
        );
        const randomMeal = randomDietMeal({
          currentDayId,
          mealType: meal.type,
          filteredDietMealsByType,
        });
        return randomMeal;
      });

      const mealsDinnersPortionsMacro = randomDayMeals.map(
        ({ randomDietMeal }) => {
          const dinnerPortionsMacro = randomDietMeal.dinners.map((dinner) => {
            const dinnerMacroPortion = getMealDinnersPortionsMacro(dinner);

            return {
              ...dinner,
              dinnerMacroPortion,
            };
          });

          return {
            ...randomDietMeal,
            dinnerPortionsMacro,
          };
        }
      );

      const mealDinners = mealsDinnersPortionsMacro.map((meal) => {
        const allMealDinnerProductsWithPortions = meal.dinnerPortionsMacro.map(
          ({ dinnerMacroPortion }) => {
            const portions = dinnerMacroPortion.dinnerProductsPortions;

            return portions;
          }
        );

        console.log({ allMealDinnerProductsWithPortions });

        const concatMealDinnersPortions =
          allMealDinnerProductsWithPortions.flatMap(
            (mealDinners) => mealDinners
          );

        console.log({ concatMealDinnersPortions });

        //złączenie wszystkich produktów w posiłku (odróżnienie za pomocą dinnerId)
        //concatMealDinners => algorytm kartezjański

        return {
          ...meal,
          concatMealDinnersPortions,
        };
      });

      console.time("cartesianProduct");
      // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)

      const dinnersCartesianGroups = mealDinners.map((meal) => ({
        mealId: meal._id,
        mealName: meal.name,
        mealsType: meal.type,
        mealEstablishment: meal.mealEstablishment,
        groups: cartesianDinners(
          meal.mealEstablishment, //get establishment
          meal.dietEstablishment,
          ...meal.concatMealDinnersPortions
        ),
      }));
      console.timeEnd("cartesianProduct");

      const selectedDinners = dinnersCartesianGroups.map((meal) => ({
        mealId: meal.mealId,
        mealName: meal.mealName,
        groups: selectGroups(meal.groups),
      }));

      console.log({
        currentDayId,
        randomDayMeals,
        mealsDinnersPortionsMacro,
        mealDinners,
        dinnersCartesianGroups,
        selectedDinners,
      });

      return resolve(selectedDinners);
    }, 100);
  });

  return generate;
};
