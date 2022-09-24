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
  addDietGenerateAction: ActionCreatorWithPayload<boolean>;
  dietGenerateAction: IDietGenerateAction;
  setDietGenerateAction: StateDispatch<SetStateAction<IDietGenerateAction>>;
  addDietDaysGenerate: ActionCreatorWithPayload<
    IDietGenerate["generatedDays"],
    string
  >;
}

export const generateDiet = ({
  days,
  generateMealsSettings,
  meals,
  allDietMeals,
  dispatch,
  addDietGenerate,
  addDietGenerateAction,
  dietGenerateAction,
  setDietGenerateAction,
  addDietDaysGenerate,
}: IGenerateDiet) => {
  const availableDietMealsToRandom = allDietMeals.filter(
    (dietMeal) => dietMeal.dinners.length > 0
  );

  const cartesianWorkerProps = {
    days,
    generateMealsSettings,
    meals,
    allDietMeals,
    availableDietMealsToRandom,
    // dispatch,
    // addDietGenerate,
    // addDietGenerateAction,
    // dietGenerateAction,
    // setDietGenerateAction,
  };

  const cartesianWorker = new Worker(
    new URL("./dietGenerateV2Worker.ts", import.meta.url)
  );

  cartesianWorker.postMessage(cartesianWorkerProps);
  cartesianWorker.onmessage = (e) => {
    const data = e.data as IDietGenerate["generatedDays"];
    console.log("web worker data:");
    console.log(data);

    //   dispatch({
    //     type: "UPDATE_FIBO",
    //     id,
    //     time,
    //     fibNum,
    //   });
    dispatch(addDietDaysGenerate(data));
    dispatch(addDietGenerateAction(false));
    cartesianWorker.terminate();
  };
};
