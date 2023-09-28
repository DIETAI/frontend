import { IDietMealData } from "interfaces/diet/dietMeals.interfaces";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import { Dispatch } from "@reduxjs/toolkit";
import { Dispatch as StateDispatch } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IDietMealGenerate } from "store/dietMealGenerate";
import { SetStateAction } from "react";

//interfaces
import { IMealGenerateAction } from "../MealGenerateModal";
import {
  IDietEstablishmentData,
  IDietEstablishmentMeal,
} from "interfaces/dietEstablishment.interfaces";
import {
  IDietMealPopulateData,
  IDietPopulateData,
} from "interfaces/diet/dietPopulate.interfaces";

export interface IGenerateDietMeal {
  allDietMeals: IDietMealData[];
  mealToGenerate: IDietMealPopulateData;
  dispatch: Dispatch;
  addDietMealGenerate: ActionCreatorWithPayload<IDietMealGenerate, string>;
  mealGenerateAction: IMealGenerateAction;
  setMealGenerateAction: StateDispatch<SetStateAction<IMealGenerateAction>>;
  dietEstablishment: IDietEstablishmentData;
  mealEstablishment: IDietEstablishmentMeal;
}

export const generateMeal = ({
  allDietMeals,
  mealToGenerate,
  dispatch,
  addDietMealGenerate,
  mealGenerateAction,
  setMealGenerateAction,
  mealEstablishment,
  dietEstablishment,
}: IGenerateDietMeal) => {
  setMealGenerateAction({
    actionType: "Selected meal",
    actionMessage: "Wybieranie posiłku",
    loading: true,
    error: false,
    errorMessage: "",
  });

  const mealGenerateWorkerProps = {
    allDietMeals,
    mealToGenerate,
    mealEstablishment,
    dietEstablishment,
  };

  const mealGenerateWorker = new Worker(
    new URL("./generateMealV3.worker.ts", import.meta.url)
  );

  mealGenerateWorker.postMessage(mealGenerateWorkerProps);
  mealGenerateWorker.onmessage = (e) => {
    const data = e.data as IDietMealGenerate;
    console.log("web worker data:");
    console.log(data);

    setMealGenerateAction({
      actionType: "",
      actionMessage: "",
      loading: false,
      error: false,
      errorMessage: "",
    });

    dispatch(addDietMealGenerate(data));
    mealGenerateWorker.terminate();
  };
};
