import { IGenerateDietDay } from "../generateDiet";

interface IRandomDietMeal {
  currentDayId: IGenerateDietDay["currentDayId"];
  mealType: IGenerateDietDay["mealsTypes"][0]["type"];
  filteredDietMealsByType: IGenerateDietDay["allDietMeals"];
}

export const randomDietMeal = ({
  currentDayId,
  mealType,
  filteredDietMealsByType,
}: IRandomDietMeal) => {
  const randomDietMeal =
    filteredDietMealsByType[
      Math.floor(Math.random() * filteredDietMealsByType.length)
    ];

  console.log(
    `Wylosowane posiłki dla dnia ${currentDayId} - ${mealType} to ${randomDietMeal.dinners.map(
      (dietDinner) => dietDinner.dinner.name
    )}`
  );

  return {
    mealType: mealType,
    randomDietMeal: randomDietMeal,
  };
};

export type RandomMeal = ReturnType<typeof randomDietMeal>;
