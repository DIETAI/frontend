import { IDietMealData } from "interfaces/diet/dietMeals.interfaces";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import { Dispatch } from "@reduxjs/toolkit";
import { Dispatch as StateDispatch } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IDietMealGenerate } from "store/dietMealGenerate";
import { SetStateAction } from "react";

//functions
import { randomDietMeal } from "./randomDietMeal/randomDietMeal";
import { getMealDinnersPortionsMacro } from "./portionsMacro/getDinnerPortionsMacro";
import { cartesianDinners } from "./cartesianDinners/cartesianDinners";
import { selectGroups } from "./selectGroups";

//interfaces
import { IMealGenerateAction } from "../MealGenerateModal";
import {
  IDietEstablishmentData,
  IDietEstablishmentMeal,
} from "interfaces/dietEstablishment.interfaces";

export interface IGenerateDietMeal {
  allDietMeals: IDietMealData[];
  mealToGenerate: IDietMealQueryData;
  dispatch: Dispatch;
  addDietMealGenerate: ActionCreatorWithPayload<IDietMealGenerate, string>;
  mealGenerateAction: IMealGenerateAction;
  setMealGenerateAction: StateDispatch<SetStateAction<IMealGenerateAction>>;
  dietEstablishment: IDietEstablishmentData;
  mealEstablishment: IDietEstablishmentMeal;
}

export const generateMeal = async ({
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

  const generatedMeal = new Promise<IDietMealGenerate>((resolve) => {
    setTimeout(() => {
      console.log("generate diet meal");

      //wszystkie dostępne posiłki dodane do diety => wykluczyć duplikaty np. 2 razy zupa pomidorowa
      const filteredDietMealsByType = allDietMeals.filter(
        ({ type }) => type === mealToGenerate.type
      );

      const newMealHandler = () => {
        let newMeal;
        let availableMeals = filteredDietMealsByType;

        for (let j = 0, l = filteredDietMealsByType.length; j < l; j++) {
          //   const randomMeal = randomDietMeal({
          //     mealType: mealToGenerate.type,
          //     filteredDietMealsByType: availableMeals,
          //   });

          const randomMeal = {
            mealType: mealToGenerate.type,
            randomDietMeal: filteredDietMealsByType[j],
          };

          console.log(
            `Wylosowane potrawy dla ${
              mealToGenerate.type
            } to ${randomMeal.randomDietMeal.dinners.map(
              (dietDinner) => dietDinner.dinner.name
            )}`
          );

          console.log({ availableMeals, randomMeal });

          const mealDinnersPortionsMacro =
            randomMeal.randomDietMeal.dinners.map((dinner) => {
              const dinnerMacroPortion = getMealDinnersPortionsMacro(dinner);

              return {
                // ...dinner,
                ...dinnerMacroPortion,
              };
            });

          const mealDinners = mealDinnersPortionsMacro.flatMap(
            ({ dinnerProductsPortions }) => {
              return dinnerProductsPortions;
            }
          );

          console.log({ mealDinners });

          // złączenie wszystkich produktów w posiłku (odróżnienie za pomocą dinnerId)

          console.time("cartesianProduct");
          //    // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)

          const maxCartesianGroups = mealDinners.length < 6 ? 50000 : 100;

          const dinnersCartesianGroups = cartesianDinners(
            mealEstablishment,
            dietEstablishment,
            maxCartesianGroups,
            ...mealDinners
          );

          console.timeEnd("cartesianProduct");

          console.log({ dinnersCartesianGroups });

          const selectedDinnersGroups = selectGroups(dinnersCartesianGroups);

          const selectedMealDinners = randomMeal.randomDietMeal.dinners.map(
            (dietDinner) => {
              const dinnerObj = {
                _id: dietDinner._id,
                dinnerId: dietDinner.dinner._id,
                dinnerName: dietDinner.dinner.name,
                dinnerProducts:
                  selectedDinnersGroups.main.group.products.filter(
                    ({ dinnerId }) => dinnerId === dietDinner.dinner._id
                  ),
              };

              return dinnerObj;
            }
          );

          const generatedMealObj: IDietMealGenerate = {
            dietMeal: {
              _id: mealToGenerate._id,
              dayId: mealToGenerate.dayId,
              dietId: mealToGenerate.dietId,
            },
            selectedMealGroup: {
              type: selectedDinnersGroups.main.type,
              name: selectedDinnersGroups.main.name,
              description: selectedDinnersGroups.main.description,
              macroTotalCount: selectedDinnersGroups.main.group.macroTotalCount,
              missingProcentCount:
                selectedDinnersGroups.main.group.missingProcentCount,
            },
            mealDinners: selectedMealDinners,
          };

          console.log({ selectedDinnersGroups });
          console.log({ generatedMealObj });

          //jesli sprawdzi wszystkie posiłki i zaden nie spełnia warunków => niech wybierze ostatni
          if (
            selectedDinnersGroups.main.type === "perfectProcent" ||
            j === l - 1
          ) {
            if (selectedDinnersGroups.main.type === "perfectProcent") {
              console.log("wybrano perfectProcent");
            }
            newMeal = generatedMealObj;
            break;
          }

          availableMeals = availableMeals.filter(
            (meal) => meal._id !== randomMeal.randomDietMeal._id
          );
        }

        console.log({ newMealPetla: newMeal });

        return newMeal;
      };

      const newMeal = newMealHandler() as IDietMealGenerate;

      return resolve(newMeal);
    }, 100);
  }).then((data) => {
    setMealGenerateAction({
      actionType: "",
      actionMessage: "",
      loading: false,
      error: false,
      errorMessage: "",
    });

    dispatch(addDietMealGenerate(data));
    return data;
  });

  return generatedMeal;
};
