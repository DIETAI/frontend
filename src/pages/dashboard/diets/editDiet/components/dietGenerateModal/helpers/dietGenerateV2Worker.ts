import {
  IDietDayMealData,
  IDietMealData,
  IDietMealDinner,
} from "interfaces/diet/dietMeals.interfaces";

import { IDietGenerate } from "store/dietGenerate";

//helpers
import { randomDietMeal } from "./randomDietMeal/randomDietMeal";
import { getMealDinnersPortionsMacro } from "./portionsMacro/getDinnerPortionsMacro";
import {
  cartesianDinners,
  ICartesianResult,
} from "./cartesianDinners/cartesianDinners";
import { ISelectedGroups, selectGroups } from "./selectGroups";

interface IDietGenerateWorker {
  days: string[];
  allDietMeals: IDietMealData[];
  meals: {
    uid: string;
    type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  }[];
}

addEventListener("message", (e: MessageEvent<IDietGenerateWorker>) => {
  const {
    data: { days, meals, allDietMeals },
  } = e;

  const generatedDays: IDietGenerate["generatedDays"] = [];

  for (let dayIndex = 0, l = days.length; dayIndex < l; dayIndex++) {
    //generatedDays[dayIndex - 1].meals nie mogą być takie same jak w tym dniu
    const currentDayId = days[dayIndex];

    const randomDayMeals = meals.map((meal) => {
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
        allMealDinnerProductsWithPortions.flatMap((mealDinners) => mealDinners);

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
      mealType: randomDayMeals.filter(
        (randomMeal) => randomMeal.randomDietMeal._id === meal.mealId
      )[0].mealType,
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

    const generatedMeals: IDietGenerate["generatedDays"][0]["day"]["meals"] =
      selectedDinners.map((meal) => {
        const randomMeal = randomDayMeals.filter(
          (randomMeal) => randomMeal.randomDietMeal._id === meal.mealId
        )[0];
        const mealDinners = randomMeal.randomDietMeal.dinners.map(
          (dietDinner) => ({
            _id: dietDinner._id,
            dinnerId: dietDinner.dinner._id,
            dinnerName: dietDinner.dinner.name,
            dinnerImage: dietDinner.dinner.image,
            dinnerProducts: meal.groups.main.group.products.filter(
              ({ dinnerId }) => dinnerId === dietDinner.dinner._id
            ),
            total: {
              kcal: roundValue(
                meal.groups.main.group.products.reduce(
                  (acc, field) => acc + Number(field.portionKcal),
                  0
                )
              ),
              protein: {
                gram: roundValue(
                  meal.groups.main.group.products.reduce(
                    (acc, field) => acc + Number(field.portionProteinGram),
                    0
                  )
                ),
              },
              fat: {
                gram: roundValue(
                  meal.groups.main.group.products.reduce(
                    (acc, field) => acc + Number(field.portionFatGram),
                    0
                  )
                ),
              },
              carbohydrates: {
                gram: roundValue(
                  meal.groups.main.group.products.reduce(
                    (acc, field) =>
                      acc + Number(field.portionCarbohydratesGram),
                    0
                  )
                ),
              },
            },
          })
        );

        const mealObj: IDietGenerate["generatedDays"][0]["day"]["meals"][0] = {
          _id: meal.mealId,
          name: meal.mealName,
          type: meal.mealType,
          selectedGroup: {
            type: meal.groups.main.type,
            name: meal.groups.main.name,
            description: meal.groups.main.description,
            macroTotalCount: meal.groups.main.group?.macroTotalCount,
            missingProcentCount: meal.groups.main.group?.missingProcentCount,
          },
          dinners: mealDinners,
        };

        return mealObj;
      });

    const dietDayGenerateObj: IDietGenerate["generatedDays"][0] = {
      loading: false,
      error: false,
      day: {
        _id: currentDayId,
        dietId: "dasd",
        name: `dzień ${currentDayId}`,
        meals: generatedMeals,
        total: {
          kcal: roundValue(
            generatedMeals.reduce(
              (acc, field) =>
                acc + Number(field.selectedGroup.macroTotalCount?.total_kcal),
              0
            )
          ),
          protein: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) =>
                  acc +
                  Number(
                    field.selectedGroup.macroTotalCount?.total_protein_gram
                  ),
                0
              )
            ),
          },
          fat: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) =>
                  acc +
                  Number(field.selectedGroup.macroTotalCount?.total_fat_gram),
                0
              )
            ),
          },
          carbohydrates: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) =>
                  acc +
                  Number(
                    field.selectedGroup.macroTotalCount
                      ?.total_carbohydrates_gram
                  ),
                0
              )
            ),
          },
        },
      },
    };

    generatedDays.push(dietDayGenerateObj);
  }

  console.log("Działa");
  postMessage(generatedDays);
});

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};
