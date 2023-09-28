import React, { useState } from "react";

//styles
import * as Styled from "./GenerateMealSettings.styles";

//components
import Button from "components/form/button/Button";

//icons
import { FaPlus, FaExchangeAlt } from "icons/icons";

type MealGenerateOption = "newMeal" | "changeAmountAddedMealDinners";

const GenerateMealSettings = ({
  mealDinnersLength,
  closeModal,
  generateMeal,
}: {
  mealDinnersLength: number;
  closeModal: () => void;
  generateMeal: () => void;
}) => {
  const [mealGenerateOption, setMealGenerateOption] =
    useState<MealGenerateOption>("newMeal");

  return (
    <>
      <Styled.MealToGenerateOptionsWrapper>
        <Styled.MealToGenerateOption
          onClick={() => setMealGenerateOption("newMeal")}
          active={mealGenerateOption === "newMeal"}
          type="newMeal"
        >
          <FaPlus />
          <h2>
            {mealDinnersLength > 0
              ? "zamień dodane potrawy"
              : "generuj nowe potrawy"}
          </h2>
        </Styled.MealToGenerateOption>
        <Styled.MealToGenerateOption
          onClick={() => setMealGenerateOption("changeAmountAddedMealDinners")}
          type="changeAmountAddedMealDinners"
          active={mealGenerateOption === "changeAmountAddedMealDinners"}
          disabled={mealDinnersLength < 1}
        >
          <FaExchangeAlt />

          <h2>dostosuj zestaw porcji do założeń dla już dodanych potraw</h2>
        </Styled.MealToGenerateOption>
      </Styled.MealToGenerateOptionsWrapper>

      <Styled.ContentButtonsWrapper>
        <Button
          variant={!mealGenerateOption ? "disabled" : "primary"}
          type="button"
          onClick={generateMeal}
        >
          generuj posiłek
        </Button>
        <Button type="button" onClick={closeModal} variant="secondary">
          anuluj
        </Button>
      </Styled.ContentButtonsWrapper>
    </>
  );
};

export default GenerateMealSettings;
