import {
  IDietDayMealData,
  IDietMealData,
  IDietMealDinner,
  IDietMealTotal,
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

interface INewGenerateMeal {
  _id: string; //dietDayMealID to generate,
  name: string;
  type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  generatedType: "new" | "added" | "addedChangePortion"; //or added or addedChangePortion,
  selectedGroup?: {
    type: string;
    name: string;
    description: string;
    macroTotalCount?: ICartesianResult["macroTotalCount"];
    missingProcentCount?: ICartesianResult["missingProcentCount"];
  };
  total: IDietMealTotal; //albo dodane już meal total albo przerobić generatedMacroTotalCount
  generatedDinners?: [
    {
      _id: string;
      dinnerId: string;
      dinnerName: string;
      dinnerImage?: string;
      dinnerProducts: ICartesianResult["products"];
      total: {
        kcal: number;
        protein: {
          gram: number;
        };
        fat: {
          gram: number;
        };
        carbohydrates: {
          gram: number;
        };
      };
    }
  ];
  addedMealObj?: IDietMealData; //or undefined when new,
}

interface IMealToRandom extends IDietMealData {
  generatedType: "new" | "added" | "addedChangePortion";
}

const generateMeals = ({
  mealsToGenerate,
  availableMealsToRandom,
  currentDayId,
}: {
  mealsToGenerate: IMealToRandom[];
  availableMealsToRandom: IDietMealData[];
  currentDayId: string;
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

    const randomMeal = randomDietMeal({
      currentDayId,
      mealType: meal.type,
      filteredDietMealsByType,
    });
    return randomMeal;
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
                  (acc, field) => acc + Number(field.portionCarbohydratesGram),
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

  const generatedDays: IDietGenerate["generatedDays"] = [];

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
      });
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
      });
      //: INewGenerateMeal[]
      const generatedMealsCheck = generatedMeals.map((meal) => ({
        _id: meal._id,
        name: meal.name,
        type: meal.type,
        generatedType: "new",
        total: {
          kcal: meal.selectedGroup.macroTotalCount?.total_kcal,
          procent: 0,
          protein: {
            procent: 0,
            kcal: 0,
            gram: meal.selectedGroup.macroTotalCount?.total_protein_gram,
          },
          fat: {
            procent: 0,
            kcal: 0,
            gram: meal.selectedGroup.macroTotalCount?.total_fat_gram,
          },
          carbohydrates: {
            procent: 0,
            kcal: 0,
            gram: meal.selectedGroup.macroTotalCount?.total_carbohydrates_gram,
          },
          fiber: {
            procent: 0,
            kcal: 0,
            gram: 0,
          },
        },
        selectedGroup: meal.selectedGroup,
        generatedDinners: meal.dinners,
        addedMealObj: undefined,
      }));

      //return generatedMealsCheck
    }

    if (generateMealsSettings === "saveAddedMeals") {
      const savedMeals = sortedCheckMeals.filter(
        (meal) => meal.dinners.length > 1
      );
      const filterMealsToRandom = sortedCheckMeals.filter(
        (meal) => meal.dinners.length < 1
      );

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
      });
      //: INewGenerateMeal[]
      const savedMealsCheck = savedMeals.map((meal) => ({
        _id: meal._id,
        name: meal.name,
        type: meal.type,
        generatedType: "added",
        total: meal.total,
        selectedGroup: undefined,
        generatedDinners: [],
        addedMealObj: meal,
      }));

      //: INewGenerateMeal[]
      const generatedMealsCheck = generatedMeals.map((meal) => ({
        _id: meal._id,
        name: meal.name,
        type: meal.type,
        generatedType: "new",
        total: {
          kcal: meal.selectedGroup.macroTotalCount?.total_kcal,
          procent: 0,
          protein: {
            procent: 0,
            kcal: 0,
            gram: meal.selectedGroup.macroTotalCount?.total_protein_gram,
          },
          fat: {
            procent: 0,
            kcal: 0,
            gram: meal.selectedGroup.macroTotalCount?.total_fat_gram,
          },
          carbohydrates: {
            procent: 0,
            kcal: 0,
            gram: meal.selectedGroup.macroTotalCount?.total_carbohydrates_gram,
          },
          fiber: {
            procent: 0,
            kcal: 0,
            gram: 0,
          },
        },
        selectedGroup: meal.selectedGroup,
        generatedDinners: meal.dinners,
        addedMealObj: undefined,
      }));

      const allMeals = savedMealsCheck.concat(generatedMealsCheck as any);

      //return day with meals

      //wylosować posiłki dla mealsToRandom i obliczyć
      //na samym końcu złączyć savedMeals z mealsToRandom => wyzwanie inny obiekt
    }

    // if (generateMealsSettings === "saveAddedMeals") {

    //   const mealTypesFiltered = meals.map((mealType) => {
    //     const addedDayMealsType = addedDayMeals.map(
    //       (addedMealType) => addedMealType.type
    //     );
    //     if (addedDayMealsType.includes(mealType.type)) {
    //       return mealType;
    //     }

    //     return undefined;
    //   });
    // }
    // const addedDayMeals = allDietMeals.filter(
    //   (dietMeal) => dietMeal.dayId === currentDayId
    // );
    //odczytać już dodane posiłki do dnia, jesli opcja => zachowaj => uwzględnij ich porcje i nie losuj => jeśli dostosuj ilość => zmienić porcje
    // const addedDayMeals = [{_id: "dwqdq", dayId: "dasda", dinners: ["Płatki", "Sok"]}];

    const randomDayMeals = sortedCheckMeals.map((meal) => {
      const filteredDietMealsByType = availableDietMealsToRandom.filter(
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
