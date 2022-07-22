import React, { useState } from "react";
import { getDiet } from "services/getDiets";
import { useParams } from "react-router";
import { useDietEstablishment } from "services/useDietEstablishments";
import { useFormContext } from "react-hook-form";
import { AnimateSharedLayout } from "framer-motion";

//styles
import * as Styled from "./Default.styles";

//icons
import { FaChevronDown } from "icons/icons";

//interfaces
import { IDietGenerateMealsSchema } from "../../../../schema/dietGenerate.schema";
import { IDietEstablishmentMeal } from "interfaces/dietEstablishment.interfaces";

const Default = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const { dietEditId } = useParams();
  console.log({ dietEditId });

  if (!dietEditId) return <div>not found</div>;

  const { diet, dietError, dietLoading } = getDiet(dietEditId);

  if (!diet) return <div>error...</div>;

  const { dietEstablishment } = useDietEstablishment(diet.establishmentId);

  return (
    // <AnimateSharedLayout>
    <Styled.DefaultMealsWrapper layout>
      {dietEstablishment?.meals.map((meal, index) => (
        <MealItem key={meal._id} meal={meal} mealIndex={index} />
      ))}
    </Styled.DefaultMealsWrapper>
    // </AnimateSharedLayout>
  );
};

const MealItem = ({
  meal,
  mealIndex,
}: {
  meal: IDietEstablishmentMeal;
  mealIndex: number;
}) => {
  const [openMealItem, setOpenMealItem] = useState(false);
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const mealTypes = watch("mealTypes") as IDietGenerateMealsSchema["mealTypes"];

  return (
    <Styled.MealItem
      layout
      key={meal._id}
      active={mealTypes.includes(meal.type)}
    >
      <Styled.MealItemHeader>
        <Styled.MealHeading>
          <span>{mealIndex + 1}</span>
          <h2>{meal.name}</h2>
        </Styled.MealHeading>

        <Styled.MealOptions>
          {mealTypes.includes(meal.type) ? (
            <Styled.MealOption type="button" optionType="remove">
              -
            </Styled.MealOption>
          ) : (
            <Styled.MealOption type="button" optionType="add">
              +
            </Styled.MealOption>
          )}

          <Styled.MealOption
            type="button"
            optionType="more"
            onClick={() => setOpenMealItem(!openMealItem)}
            open={openMealItem}
          >
            <FaChevronDown />
          </Styled.MealOption>
        </Styled.MealOptions>
      </Styled.MealItemHeader>

      {openMealItem && <div>add dinnerTypes</div>}
    </Styled.MealItem>
  );
};

export default Default;
