import { IGenerateDietMeal } from "../generateMeal";

interface IRandomDietMeal {
  mealType: IGenerateDietMeal["mealToGenerate"]["type"];
  filteredDietMealsByType: IGenerateDietMeal["allDietMeals"];
}

export const randomDietMeal = ({
  mealType,
  filteredDietMealsByType,
}: IRandomDietMeal) => {
  const randomDietMeal =
    filteredDietMealsByType[
      Math.floor(Math.random() * filteredDietMealsByType.length)
    ];

  console.log(
    `Wylosowane potrawy dla ${mealType} to ${randomDietMeal.dinners.map(
      (dietDinner) => dietDinner.dinner.name
    )}`
  );

  return {
    mealType: mealType,
    randomDietMeal: randomDietMeal,
  };
};

export type RandomMeal = ReturnType<typeof randomDietMeal>;
