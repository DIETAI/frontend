export interface IGenerateDiet {
  days: string[];
  generateMealsSettings:
    | "changeAmountAddedMeals"
    | "saveAddedMeals"
    | "newMeals";
  meals: {
    uid: string;
    type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  };
}

export const generateDiet = async ({
  days,
  generateMealsSettings,
  meals,
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
  currentDayId: string;
  mealsTypes: {
    uid: string;
    type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  };
}

const generateDietDay = async ({
  currentDayId,
  mealsTypes,
}: IGenerateDietDay) => {
  const generate = new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log("generate diet day");
      return resolve("hello");
    }, 4000);
  });

  return generate;
};
