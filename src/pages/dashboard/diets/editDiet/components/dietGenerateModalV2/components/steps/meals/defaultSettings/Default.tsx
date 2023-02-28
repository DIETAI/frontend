import React, { useEffect, useState } from "react";
import { getDietPopulate } from "services/getDiets";
import { useParams } from "react-router";
import { useFormContext } from "react-hook-form";

//styles
import * as Styled from "./Default.styles";

//interfaces
import { IDietGenerateMealsSchema } from "../../../../schema/dietGenerate.schema";
import { IDietEstablishmentMeal } from "interfaces/dietEstablishment.interfaces";

const Default = () => {
  const {
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext();

  const { dietEditId } = useParams();
  const { diet } = getDietPopulate(dietEditId as string);

  useEffect(() => {
    if (diet) {
      setValue(
        "meals",
        diet.establishmentId.meals.map((meal) => ({
          uid: meal._id,
          type: meal.type,
          dinnerTypes: [],
        }))
      );
      trigger();
    }
  }, [diet]);

  return (
    <Styled.DefaultMealsWrapper>
      {diet?.establishmentId?.meals.map((meal, index) => (
        <MealItem key={meal._id} meal={meal} mealIndex={index} />
      ))}
    </Styled.DefaultMealsWrapper>
  );
};

const MealItem = ({
  meal,
  mealIndex,
}: {
  meal: IDietEstablishmentMeal;
  mealIndex: number;
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const meals = watch("meals") as IDietGenerateMealsSchema["meals"];

  const mealTypes = meals.map((meal) => meal.type);

  const removeMealType = () => {
    setValue(
      `meals`,
      meals.filter((newMeal) => newMeal.uid !== meal._id)
    );
    trigger();
  };

  const addMealType = () => {
    setValue(`meals`, [
      ...meals,
      { uid: meal._id, type: meal.type, dinnerTypes: [] },
    ]);
    trigger();
  };

  return (
    <Styled.MealItem active={mealTypes.includes(meal.type)}>
      <Styled.MealItemHeader>
        <Styled.MealHeading>
          <span>{mealIndex + 1}</span>
          <h2>{meal.name}</h2>
        </Styled.MealHeading>

        <Styled.MealOptions>
          {mealTypes.includes(meal.type) ? (
            <Styled.MealOption
              type="button"
              optionType="remove"
              onClick={removeMealType}
            >
              -
            </Styled.MealOption>
          ) : (
            <Styled.MealOption
              type="button"
              optionType="add"
              onClick={addMealType}
            >
              +
            </Styled.MealOption>
          )}
        </Styled.MealOptions>
      </Styled.MealItemHeader>
    </Styled.MealItem>
  );
};

export default Default;
