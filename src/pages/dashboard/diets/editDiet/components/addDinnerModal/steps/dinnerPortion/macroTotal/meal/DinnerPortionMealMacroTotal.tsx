import React from "react";
import * as Styled from "../DinnerPortionMacroTotal.styles";
import { useFormContext } from "react-hook-form";
import { getDiet } from "services/getDiets";
import { getDietDayMeal } from "services/getDietMeals";
import { useDietEstablishment } from "services/useDietEstablishments";
import { SumModal } from "../sumModal/SumModal";

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

  const mealId = watch("dietMealId") as string;
  const dietId = watch("dietId") as string;

  const { diet } = getDiet(dietId);

  if (!diet) return null;

  const { dietDayMeal: meal } = getDietDayMeal(mealId);
  const { dietEstablishment: establishment } = useDietEstablishment(
    diet.establishmentId
  );

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
        <h3>Razem:</h3>
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
      </Styled.TotalWrapper>
    </Styled.TotalContainer>
  );
};

export default DinnerPortionMealMacroTotal;
