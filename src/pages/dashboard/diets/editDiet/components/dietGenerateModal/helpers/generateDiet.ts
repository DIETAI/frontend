import {
  IDietDayMealData,
  IDietMealData,
  IDietMealDinner,
} from "interfaces/diet/dietMeals.interfaces";

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

      const randomDietMeals = mealsTypes.map((meal) => {
        const filteredDietMealsByType = allDietMeals.filter(
          ({ type }) => type === meal.type
        );

        if (filteredDietMealsByType.length < 1) {
          return {
            mealType: meal.type,
            randomDietMeal: null,
          };
        }

        const randomDietMeal =
          filteredDietMealsByType[
            Math.floor(Math.random() * filteredDietMealsByType.length)
          ];

        console.log(
          `Wylosowane posiłki dla dnia ${currentDayId} - ${
            meal.type
          } to ${randomDietMeal.dinners.map(
            (dietDinner) => dietDinner.dinner.name
          )}`
        );
        return {
          mealType: meal.type,
          randomDietMeal: randomDietMeal,
        };
      });

      console.log({ currentDayId, randomDietMeals });

      return resolve(randomDietMeals);
    }, 4000);
  });

  return generate;
};
