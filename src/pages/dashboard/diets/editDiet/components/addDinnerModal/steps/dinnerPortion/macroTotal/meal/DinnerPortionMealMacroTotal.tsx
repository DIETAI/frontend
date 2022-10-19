import React, { useEffect, useState } from "react";
import * as Styled from "../DinnerPortionMacroTotal.styles";
import { useFormContext } from "react-hook-form";
import { getDiet } from "services/getDiets";
import { getDietDayMeal } from "services/getDietMeals";
import { useDietEstablishment } from "services/useDietEstablishments";
import { SumModal } from "../sumModal/SumModal";
import { getDinnerPortion } from "services/getDinnerPortions";

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

const DinnerPortionMealMacroTotal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const [mealTotalAfterAddedPortion, setMealTotalAfterAddedPortion] =
    useState<any>();

  const mealId = watch("dietMealId") as string;
  const dietId = watch("dietId") as string;
  const selectedDinnerPortionId = watch("dinnerPortionId") as string;

  const { dinnerPortion } = getDinnerPortion(selectedDinnerPortionId);

  const { diet } = getDiet(dietId);

  if (!diet) return null;

  const { dietDayMeal: meal } = getDietDayMeal(mealId);
  const { dietEstablishment: establishment } = useDietEstablishment(
    diet.establishmentId
  );

  useEffect(() => {
    if (dinnerPortion && meal) {
      const kcal = roundValue(dinnerPortion.total.kcal + meal.total.kcal);
      const proteinGram = roundValue(
        dinnerPortion.total.protein.gram + meal.total.protein.gram
      );
      const fatGram = roundValue(
        dinnerPortion.total.fat.gram + meal.total.fat.gram
      );
      const carbohydratesGram = roundValue(
        dinnerPortion.total.carbohydrates.gram + meal.total.carbohydrates.gram
      );

      setMealTotalAfterAddedPortion({
        kcal,
        proteinGram,
        fatGram,
        carbohydratesGram,
      });
    }
  }, [dinnerPortion, meal]);

  if (!meal || !establishment) return null;

  const mealEstablishment = establishment.meals.find(
    ({ _id }) => _id === meal.establishmentMealId
  );

  if (!mealEstablishment) return null;

  return (
    <Styled.TotalContainer>
      <Styled.TotalHeadingWrapper>
        <h2>Posiłek</h2>
      </Styled.TotalHeadingWrapper>
      <Styled.TotalWrapper>
        <h3>Obecnie:</h3>
        <Styled.TotalMacroItemsWrapper>
          <SumModal
            macroType="kcal"
            totalValue={meal.total.kcal}
            establishmentValue={mealEstablishment?.kcal as number}
          />

          <p>
            B: <b>{meal.total?.protein.gram}</b>{" "}
          </p>
          <p>
            T: <b>{meal.total?.fat.gram}</b>{" "}
          </p>
          <p>
            W: <b>{meal.total?.carbohydrates.gram}</b>{" "}
          </p>
        </Styled.TotalMacroItemsWrapper>
        <h3>Po dodaniu porcji:</h3>
        <Styled.TotalMacroItemsWrapper>
          <SumModal
            macroType="kcal"
            totalValue={mealTotalAfterAddedPortion?.kcal || meal.total.kcal}
            establishmentValue={mealEstablishment?.kcal as number}
          />

          <p>
            B:{" "}
            <b>
              {mealTotalAfterAddedPortion?.proteinGram ||
                meal.total?.protein.gram}
            </b>{" "}
          </p>
          <p>
            T:{" "}
            <b>{mealTotalAfterAddedPortion?.fatGram || meal.total?.fat.gram}</b>{" "}
          </p>
          <p>
            W:{" "}
            <b>
              {mealTotalAfterAddedPortion?.carbohydratesGram ||
                meal.total?.carbohydrates.gram}
            </b>{" "}
          </p>
        </Styled.TotalMacroItemsWrapper>
      </Styled.TotalWrapper>
    </Styled.TotalContainer>
  );
};

export default DinnerPortionMealMacroTotal;
