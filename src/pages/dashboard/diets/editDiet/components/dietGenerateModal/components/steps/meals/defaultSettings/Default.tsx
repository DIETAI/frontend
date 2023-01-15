import React, { useEffect, useState } from "react";
import { getDiet } from "services/getDiets";
import { useParams } from "react-router";
import { getDietEstablishment } from "services/getDietEstablishments";
import { useFormContext, useFieldArray } from "react-hook-form";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import ReactLoading from "react-loading";

//styles
import * as Styled from "./Default.styles";

//icons
import { FaChevronDown } from "icons/icons";

//interfaces
import { IDietGenerateMealsSchema } from "../../../../schema/dietGenerate.schema";
import { IDietEstablishmentMeal } from "interfaces/dietEstablishment.interfaces";

//components
import Input from "components/form/input/Input";
import Autocomplete from "components/form/autocomplete/Autocomplete";

const dinnerTypeOptions = [
  { id: 1, type: "mainCourse", name: "Danie główne" },
  { id: 2, type: "soup", name: "Zupa" },
  { id: 3, type: "drink", name: "Napój" },
];

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

  const meals = watch("meals") as IDietGenerateMealsSchema["meals"];

  if (!dietEditId) return <div>not found</div>;

  const { diet, dietError, dietLoading } = getDiet(dietEditId);
  if (!diet) return <div>not found</div>;

  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = getDietEstablishment(diet.establishmentId as string);

  useEffect(() => {
    if (dietEstablishment) {
      setValue(
        "meals",
        dietEstablishment.meals.map((meal) => ({
          uid: meal._id,
          type: meal.type,
          dinnerTypes: [],
        }))
      );
      trigger();
    }
  }, [dietEstablishment]);

  if (dietEstablishmentLoading) {
    return (
      <Styled.LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h2>Pobieranie założeń</h2>
      </Styled.LoadingWrapper>
    );
  }

  if (dietEstablishmentError) {
    return (
      <Styled.EmptyDataWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2>Pobieranie założeń nie powiodło się</h2>
      </Styled.EmptyDataWrapper>
    );
  }

  return (
    // <AnimateSharedLayout>
    <Styled.DefaultMealsWrapper>
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

  const meals = watch("meals") as IDietGenerateMealsSchema["meals"];
  // const dinnerTypes = watch(
  //   `meals.${mealIndex}.dinnerTypes`
  // ) as IDietGenerateMealsSchema["meals"][0]["dinnerTypes"];
  // const dinnerTypes = watch(
  //   "dinnerTypes"
  // ) as IDietGenerateMealsSchema["dinnerTypes"];

  // const addDinnerType = () => {
  //   setOpenMealItem(true);
  //   setValue(`meals.${mealIndex}.dinnerTypes`, [...dinnerTypes, "mainCourse"]);
  // };

  const mealTypes = meals.map((meal) => meal.type);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: `meals.${mealIndex}.dinnerTypes`, // unique name for your Field Array
    }
  );

  const removeDinnerType = (dinnerTypeIndex: number) => {
    remove(dinnerTypeIndex);
  };

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

          {/* <Styled.MealOption
            type="button"
            optionType="more"
            onClick={addDinnerType}
            open={openMealItem}
          >
            <FaChevronDown />
          </Styled.MealOption> */}
        </Styled.MealOptions>
      </Styled.MealItemHeader>

      {/* <AnimatePresence> */}
      {/* {fields.map((field, index) => (
        <Styled.DinnerTypesWrapper
          key={field.id}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
        >
          <Styled.DinnerType>
            <span></span>
            <Autocomplete
              name={`meals.${mealIndex}.dinnerTypes.${index}`}
              label="typ dania"
              optionLabel="name"
              options={dinnerTypeOptions}
              optionRender="type"
            />
            <button type="button" onClick={() => removeDinnerType(index)}>
              -
            </button>
          </Styled.DinnerType>
        </Styled.DinnerTypesWrapper>
      ))} */}
      {/* </AnimatePresence> */}
      {/* <button onClick={addDinnerType} type="button">
        dodaj typ posiłku
      </button> */}
    </Styled.MealItem>
  );
};

export default Default;
