import React, { useState } from "react";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import { getAllDietMeals } from "services/getDietMeals";

//helpers
import { generateMeal } from "./helpers/generateMeal";

//store
import { addDietMealGenerate } from "store/dietMealGenerate";
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";

interface IMealGenerateAction {
  actionType: string;
  actionMessage: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const MealGenerateModal = ({
  meal,
  closeModal,
}: {
  meal: IDietMealQueryData;
  closeModal: () => void;
}) => {
  const [mealGenerateAction, setMealGenerateAction] =
    useState<IMealGenerateAction>({
      actionType: "",
      actionMessage: "",
      loading: false,
      error: false,
      errorMessage: "",
    });

  const dispatch = useDispatch();
  const { mealDinners, dietMeal } = useSelector(
    (state: RootState) => state.dietMealGenerate
  );

  const { dietMeals } = getAllDietMeals();

  if (!dietMeals) return null;

  const handleGenerateDietMeal = async () => {
    const generatedDietMeal = await generateMeal({
      mealToGenerate: meal,
      allDietMeals: dietMeals,
    });

    // dispatch(addDietMealGenerate({}));
  };

  return (
    <div>
      <h1>generuj posiłek</h1>
      <button type="button" onClick={handleGenerateDietMeal}>
        generuj posiłek
      </button>
    </div>
  );
};

export default MealGenerateModal;
