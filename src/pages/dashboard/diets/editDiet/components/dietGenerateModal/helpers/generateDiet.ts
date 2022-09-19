import {
  IDietDayMealData,
  IDietMealData,
  IDietMealDinner,
} from "interfaces/diet/dietMeals.interfaces";
import { IDietGenerateAction } from "../components/multistepContainer/MultistepContainer";

import { Dispatch } from "@reduxjs/toolkit";
import { Dispatch as StateDispatch, SetStateAction } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IDietGenerate } from "store/dietGenerate";

//helpers
import { randomDietMeal } from "./randomDietMeal/randomDietMeal";
import { getMealDinnersPortionsMacro } from "./portionsMacro/getDinnerPortionsMacro";
import {
  cartesianDinners,
  ICartesianResult,
} from "./cartesianDinners/cartesianDinners";
import { ISelectedGroups, selectGroups } from "./selectGroups";

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
  dispatch: Dispatch;
  addDietGenerate: ActionCreatorWithPayload<
    IDietGenerate["generatedDays"][0],
    string
  >;
  dietGenerateAction: IDietGenerateAction;
  setDietGenerateAction: StateDispatch<SetStateAction<IDietGenerateAction>>;
}

export const generateDiet = async ({
  days,
  generateMealsSettings,
  meals,
  allDietMeals,
  dispatch,
  addDietGenerate,
  dietGenerateAction,
  setDietGenerateAction,
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

    setDietGenerateAction({
      dayId,
      generatedDays: generatedLoopDays,
      actionType: "Random meal",
      actionMessage: "Wybieranie posiłków",
      loading: true,
      error: false,
      errorMessage: "",
    });

    // const currentDay = dietDays.filter(({ id }) => id === day)[0];
    // const dayMeals = meals.filter(({ dayId }) => dayId === day);

    //znaleść najbardziej pasujący dietDayMealObject z już dodanych diet admina i wyszukać wszystkie dostępne dinner portions
    // => najpierw wyszukanie najlepszego dietMeal w algorytmie rekomendacji
    // => później wybranie idealnego zestawu porcji
    const generatedDietDayMeals = await generateDietDay({
      currentDayId: dayId,
      mealsTypes: meals,
      allDietMeals,
      dispatch,
      addDietGenerate,
    });

    console.log({ generatedDietDayMeals });

    if (dayId === days[days.length - 1]) {
      // return changeDietGenerateAction(0, false, "", [0]);
      setDietGenerateAction({
        dayId: "",
        generatedDays: generatedLoopDays,
        actionType: "",
        actionMessage: "",
        loading: false,
        error: false,
        errorMessage: "",
      });

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
  dispatch: Dispatch;
  addDietGenerate: ActionCreatorWithPayload<
    IDietGenerate["generatedDays"][0],
    string
  >;
}

const generateDietDay = async ({
  currentDayId,
  mealsTypes,
  allDietMeals,
  dispatch,
  addDietGenerate,
}: IGenerateDietDay) => {
  const generate = new Promise<IDietGenerate["generatedDays"][0]>((resolve) => {
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

      const generatedMeals: IDietGenerate["generatedDays"][0]["meals"] =
        selectedDinners.map((meal) => {
          const randomMeal = randomDayMeals.filter(
            (randomMeal) => randomMeal.randomDietMeal._id === meal.mealId
          )[0];
          const mealDinners = randomMeal.randomDietMeal.dinners.map(
            (dietDinner) => ({
              _id: dietDinner._id,
              dinnerId: dietDinner.dinner._id,
              dinnerName: dietDinner.dinner.name,
              dinnerProducts: meal.groups.main.group.products.filter(
                ({ dinnerId }) => dinnerId === dietDinner.dinner._id
              ),
            })
          );

          const mealObj: IDietGenerate["generatedDays"][0]["meals"][0] = {
            _id: meal.mealId,
            name: meal.mealName,
            type: "breakfast",
            selectedGroup: {
              type: meal.groups.main.type,
              name: meal.groups.main.name,
              description: meal.groups.main.description,
              macroTotalCount: meal.groups.main.group?.macroTotalCount,
              missingProcentCount: meal.groups.main.group?.missingProcentCount,
            },
            dinners: mealDinners as any,
          };

          return mealObj;
        });

      const dietDayGenerateObj: IDietGenerate["generatedDays"][0] = {
        _id: currentDayId,
        dietId: "dasd",
        name: `dzień ${currentDayId}`,
        meals: generatedMeals,
      };

      dispatch(addDietGenerate(dietDayGenerateObj));

      return resolve(dietDayGenerateObj);
    }, 100);
  });

  return generate;
};
