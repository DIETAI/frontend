import React, { useState } from "react";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import { getAllDietMeals } from "services/getDietMeals";

//helpers
import { generateMeal } from "./helpers/generateMeal";

//store
import { addDietMealGenerate } from "store/dietMealGenerate";
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  IDietEstablishmentData,
  IDietEstablishmentMeal,
} from "interfaces/dietEstablishment.interfaces";

export interface IMealGenerateAction {
  actionType: string;
  actionMessage: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const MealGenerateModal = ({
  meal,
  mealEstablishment,
  dietEstablishment,
  closeModal,
}: {
  meal: IDietMealQueryData;
  mealEstablishment: IDietEstablishmentMeal;
  dietEstablishment: IDietEstablishmentData;
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
  const { mealDinners, dietMeal, selectedMealGroup } = useSelector(
    (state: RootState) => state.dietMealGenerate
  );

  const { dietMeals } = getAllDietMeals();

  if (!dietMeals) return null;

  const handleGenerateDietMeal = async () => {
    const generatedDietMeal = await generateMeal({
      mealToGenerate: meal,
      allDietMeals: dietMeals,
      dispatch,
      addDietMealGenerate,
      mealGenerateAction,
      setMealGenerateAction,
      dietEstablishment,
      mealEstablishment,
    });

    // dispatch(addDietMealGenerate({}));
  };

  return (
    <div>
      <h1>generuj posiłek</h1>
      {mealGenerateAction.loading && (
        <div>
          <h2>loading...</h2>
          <p>{mealGenerateAction.actionMessage}</p>
        </div>
      )}

      {!mealGenerateAction.loading ||
        (mealDinners.length < 1 && (
          <div>
            <button type="button" onClick={handleGenerateDietMeal}>
              generuj posiłek
            </button>
          </div>
        ))}

      {mealDinners.length > 0 && (
        <div>
          <h3>razem: {selectedMealGroup?.macroTotalCount.total_kcal} kcal</h3>

          <h3>wygenerowane posiłki</h3>
          {mealDinners.map((mealDinner) => (
            <div key={mealDinner.dinnerId}>
              <li>{mealDinner.dinnerName}</li>
              <h4>porcje produktów</h4>
              {mealDinner.dinnerProducts.map((dinnerProduct) => (
                <div key={dinnerProduct.productId}>
                  <p>produkt: {dinnerProduct.productName}</p>
                  <h5>porcja: {dinnerProduct.portion} g</h5>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealGenerateModal;
