import {
  IDietDayMealData,
  IDietMealData,
  IDietMealDinner,
  IDietMealTotal,
} from "interfaces/diet/dietMeals.interfaces";

import {
  IDietGenerate,
  IDietGenerateDay,
  IDietGenerateMeal,
} from "store/dietGenerate";

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
  availableDietMealsToRandom: IDietMealData[];
  generateMealsSettings:
    | "changeAmountAddedMeals"
    | "saveAddedMeals"
    | "newMeals";
  meals: {
    uid: string;
    type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  }[];
}

interface IMealToRandom extends IDietMealData {
  generatedType: "new" | "added" | "addedChangePortion";
}

const generateMeals = ({
  mealsToGenerate,
  availableMealsToRandom,
  currentDayId,
  allDietMeals,
}: {
  mealsToGenerate: IMealToRandom[];
  availableMealsToRandom: IDietMealData[];
  currentDayId: string;
  allDietMeals: IDietMealData[];
}) => {
  const randomDayMeals = mealsToGenerate.map((meal) => {
    if (meal.generatedType === "addedChangePortion") {
      return {
        mealType: meal.type,
        randomDietMeal: meal,
      };
    }

    const filteredDietMealsByType = availableMealsToRandom.filter(
      ({ type }) => type === meal.type
    );

    //for filteredDietMealsByType.length
    //pętla posiłków (jeśli posiłki nie spełniają założeń kcal i przedziału makroskładników to wylosować nowe)
    const randomMeal = randomDietMeal({
      currentDayId,
      mealType: meal.type,
      filteredDietMealsByType,
    });

    const randomMealWithGeneratedType = {
      mealType: randomMeal.mealType,
      randomDietMeal: {
        ...randomMeal.randomDietMeal,
        generatedType: meal.generatedType,
      },
    };

    //cartesianProduct for random Meal tutaj => sprawdzić czy dany posiłek spełnia założenia

    return randomMealWithGeneratedType;
  });

  const mealsDinnersPortionsMacro = randomDayMeals.map(({ randomDietMeal }) => {
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
  });

  const mealDinners = mealsDinnersPortionsMacro.map((meal) => {
    const allMealDinnerProductsWithPortions = meal.dinnerPortionsMacro.map(
      ({ dinnerMacroPortion }) => {
        const portions = dinnerMacroPortion.dinnerProductsPortions;

        return portions;
      }
    );

    console.log({ allMealDinnerProductsWithPortions });

    const concatMealDinnersPortions = allMealDinnerProductsWithPortions.flatMap(
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
    generatedType: meal.generatedType,
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
    generatedType: meal.generatedType,
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

  const generatedMeals: IDietGenerateMeal[] = selectedDinners.map((meal) => {
    const randomMeal = randomDayMeals.filter(
      (randomMeal) => randomMeal.randomDietMeal._id === meal.mealId
    )[0];

    const mealDinners = randomMeal.randomDietMeal.dinners.map((dietDinner) => ({
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
              (acc, field) => acc + Number(field.portionCarbohydratesGram),
              0
            )
          ),
        },
      },
    }));

    const mealObj: IDietGenerateMeal = {
      _id: allDietMeals.filter(
        (dietMeal) =>
          dietMeal.dayId === currentDayId && dietMeal.type === meal.mealType
      )[0]._id, //meal danego dnia
      name: meal.mealName,
      type: meal.mealType,
      generatedType: meal.generatedType,
      totalGroups: dinnersCartesianGroups.find(
        (cartesianGroup) => cartesianGroup.mealsType === meal.mealType
      )?.groups.length,
      selectedGroup: {
        type: meal.groups.main.type,
        name: meal.groups.main.name,
        description: meal.groups.main.description,
        macroTotalCount: meal.groups.main.group?.macroTotalCount,
        missingProcentCount: meal.groups.main.group?.missingProcentCount,
      },
      generatedDinners: mealDinners as any,
      total: {
        kcal: meal.groups.main.group.macroTotalCount?.total_kcal,
        procent: 0,
        protein: {
          procent: 0,
          kcal: 0,
          gram: meal.groups.main.group.macroTotalCount?.total_protein_gram,
        },
        fat: {
          procent: 0,
          kcal: 0,
          gram: meal.groups.main.group.macroTotalCount?.total_fat_gram,
        },
        carbohydrates: {
          procent: 0,
          kcal: 0,
          gram: meal.groups.main.group.macroTotalCount
            ?.total_carbohydrates_gram,
        },
        fiber: {
          kcal: 0,
          gram: 0,
        },
      },
    };

    return mealObj;
  });

  return generatedMeals;
};

addEventListener("message", (e: MessageEvent<IDietGenerateWorker>) => {
  const {
    data: {
      days,
      meals,
      allDietMeals,
      generateMealsSettings,
      availableDietMealsToRandom,
    },
  } = e;

  const generatedDays: IDietGenerateDay[] = [];

  for (let dayIndex = 0, l = days.length; dayIndex < l; dayIndex++) {
    //generatedDays[dayIndex - 1].meals nie mogą być takie same jak w tym dniu
    const currentDayId = days[dayIndex];

    //opcje zachowania już dodanych posiłków
    const addedDayMeals = allDietMeals.filter(
      (dietMeal) => dietMeal.dayId === currentDayId
    );

    //problem z generowaniem diety (nieodpowiednie produkty w śniadaniu)

    console.log({ addedDayMeals });

    const checkMeals = [] as IDietMealData[];
    for (
      let mealIndex = 0, length = addedDayMeals.length;
      mealIndex < length;
      mealIndex++
    ) {
      const dayMeal = addedDayMeals[mealIndex];
      const checkMealInGenerate = meals.find(
        (mealType) => mealType.type === dayMeal.type
      );
      if (checkMealInGenerate) {
        checkMeals.push(dayMeal);
      }
    }

    console.log({ checkMeals });

    const sortedCheckMeals = [...checkMeals].sort((a, b) => a.order - b.order);

    if (generateMealsSettings === "changeAmountAddedMeals") {
      //przy losowaniu sprawdzić meal.dinners.length
      //jeśli są potrawy wybrać ten posiłek (sortedCheckMeals[0]) zamiast losować
      //obliczać porcje
      const mealsToRandom: IMealToRandom[] = sortedCheckMeals.map((meal) => {
        if (meal.dinners.length > 0) {
          return {
            ...meal,
            generatedType: "addedChangePortion",
          };
        }

        return {
          ...meal,
          generatedType: "new",
        };
      });

      //przy losowaniu zwrócić uwagę na generatedType
      //if addedChangePortion => nie losować posiłku tylko zostawić a następnie dostosować ilość
      const generatedMeals = generateMeals({
        mealsToGenerate: mealsToRandom,
        availableMealsToRandom: availableDietMealsToRandom,
        currentDayId,
        allDietMeals,
      });

      const dietDayGenerateObj: IDietGenerateDay = {
        action: "generated",
        _id: currentDayId,
        total: {
          kcal: roundValue(
            generatedMeals.reduce(
              (acc, field) => acc + Number(field.total.kcal),
              0
            )
          ),
          protein: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) => acc + Number(field.total.protein.gram),
                0
              )
            ),
          },
          fat: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) => acc + Number(field.total.fat.gram),
                0
              )
            ),
          },
          carbohydrates: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) => acc + Number(field.total.carbohydrates.gram),
                0
              )
            ),
          },
        },
        meals: generatedMeals,
      };

      generatedDays.push(dietDayGenerateObj);
    }

    if (generateMealsSettings === "newMeals") {
      const mealsToRandom: IMealToRandom[] = sortedCheckMeals.map((meal) => ({
        ...meal,
        generatedType: "new",
      }));

      const generatedMeals = generateMeals({
        mealsToGenerate: mealsToRandom,
        availableMealsToRandom: availableDietMealsToRandom,
        currentDayId,
        allDietMeals,
      });

      const dietDayGenerateObj: IDietGenerateDay = {
        action: "generated",
        _id: currentDayId,
        total: {
          kcal: roundValue(
            generatedMeals.reduce(
              (acc, field) => acc + Number(field.total.kcal),
              0
            )
          ),
          protein: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) => acc + Number(field.total.protein.gram),
                0
              )
            ),
          },
          fat: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) => acc + Number(field.total.fat.gram),
                0
              )
            ),
          },
          carbohydrates: {
            gram: roundValue(
              generatedMeals.reduce(
                (acc, field) => acc + Number(field.total.carbohydrates.gram),
                0
              )
            ),
          },
        },
        meals: generatedMeals,
      };

      generatedDays.push(dietDayGenerateObj);
    }

    if (generateMealsSettings === "saveAddedMeals") {
      //nie wybiera posiłków z potrawami - poprawić
      const savedMeals = sortedCheckMeals.filter(
        (meal) => meal.dinners.length >= 1
      );
      const filterMealsToRandom = sortedCheckMeals.filter(
        (meal) => meal.dinners.length < 1
      );

      console.log({ savedMeals, filterMealsToRandom });

      const mealsToRandom: IMealToRandom[] = filterMealsToRandom.map(
        (meal) => ({
          ...meal,
          generatedType: "new",
        })
      );

      const generatedMeals = generateMeals({
        mealsToGenerate: mealsToRandom,
        availableMealsToRandom: availableDietMealsToRandom,
        currentDayId,
        allDietMeals,
      });

      const savedMealsCheck: IDietGenerateMeal[] = savedMeals.map((meal) => ({
        _id: meal._id,
        name: meal.name,
        type: meal.type,
        generatedType: "added",
        total: meal.total,
        selectedGroup: undefined,
        generatedDinners: [],
        addedMealObj: meal,
      }));

      const allMeals = savedMealsCheck.concat(generatedMeals);

      console.log({ allMeals });

      const dietDayGenerateObj: IDietGenerateDay = {
        action: "generated",
        _id: currentDayId,
        total: {
          kcal: roundValue(
            allMeals.reduce((acc, field) => acc + Number(field.total.kcal), 0)
          ),
          protein: {
            gram: roundValue(
              allMeals.reduce(
                (acc, field) => acc + Number(field.total.protein.gram),
                0
              )
            ),
          },
          fat: {
            gram: roundValue(
              allMeals.reduce(
                (acc, field) => acc + Number(field.total.fat.gram),
                0
              )
            ),
          },
          carbohydrates: {
            gram: roundValue(
              allMeals.reduce(
                (acc, field) => acc + Number(field.total.carbohydrates.gram),
                0
              )
            ),
          },
        },
        meals: allMeals,
      };

      generatedDays.push(dietDayGenerateObj);
    }
  }

  console.log("Działa");
  postMessage(generatedDays);
});

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};
