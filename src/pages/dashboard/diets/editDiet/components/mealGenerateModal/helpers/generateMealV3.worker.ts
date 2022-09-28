//interfaces
import { IDietMealData } from "interfaces/diet/dietMeals.interfaces";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import { IDietMealGenerate } from "store/dietMealGenerate";
import {
  IDietEstablishmentData,
  IDietEstablishmentMeal,
} from "interfaces/dietEstablishment.interfaces";

//functions
import { randomDietMeal } from "./randomDietMeal/randomDietMeal";
import { getMealDinnersPortionsMacro } from "./portionsMacro/getDinnerPortionsMacro";
import { cartesianDinners } from "./cartesianDinners/cartesianDinners";
import { selectGroups } from "./selectGroups";

interface IMealGenerateWorker {
  allDietMeals: IDietMealData[];
  mealToGenerate: IDietMealQueryData;
  dietEstablishment: IDietEstablishmentData;
  mealEstablishment: IDietEstablishmentMeal;
}

addEventListener("message", (e: MessageEvent<IMealGenerateWorker>) => {
  const {
    data: {
      allDietMeals,
      mealToGenerate,
      dietEstablishment,
      mealEstablishment,
    },
  } = e;

  console.log("generate diet meal");

  const filteredDietMealsByType = allDietMeals.filter(
    ({ type, dinners }) => type === mealToGenerate.type && dinners.length > 0
  );

  console.log({ filteredDietMealsByType });

  const randomMeal = randomDietMeal({
    mealType: mealToGenerate.type,
    filteredDietMealsByType,
  });

  const mealDinnersPortionsMacro = randomMeal.randomDietMeal.dinners.map(
    (dinner) => {
      const dinnerMacroPortion = getMealDinnersPortionsMacro(dinner);

      return {
        // ...dinner,
        ...dinnerMacroPortion,
      };
    }
  );

  console.log({ mealDinnersPortionsMacro });

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
        dinnerProducts: selectedDinnersGroups.main.group.products.filter(
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
      missingProcentCount: selectedDinnersGroups.main.group.missingProcentCount,
    },
    mealDinners: selectedMealDinners,
  };

  console.log({ selectedDinnersGroups });
  console.log({ generatedMealObj });

  postMessage(generatedMealObj);
});
