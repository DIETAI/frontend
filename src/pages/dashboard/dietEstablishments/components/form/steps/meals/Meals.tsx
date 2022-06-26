import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IEstablishmentsMeals } from "pages/dashboard/dietEstablishments/schema/dietEstablishment.schema";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";

//styles
import * as Styled from "./Meals.styles";

//form
import { useFieldArray, useFormContext } from "react-hook-form";

//icons
import { FaTrash, FaPlus, FaEdit } from "icons/icons";

//helpers
import { round2 } from "pages/dashboard/dietEstablishments/helpers/round";

const Meals = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "meals",
    });

  const kcal = watch("kcal") as number;
  const meals = watch("meals") as IEstablishmentsMeals["meals"];
  const totalMealsProcent = watch("maxMealsProcent") as number;

  const addMeal = () => {
    return append({ name: "", amount: 0 });
  };

  const removeMeal = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (meals.length > 0) {
      const mealsProcentSum = meals.reduce(
        (acc, field) => acc + field.procent,
        0
      );

      if (isNaN(mealsProcentSum)) {
        return setValue("maxMealsProcent", 0);
      }

      return setValue("maxMealsProcent", round2(mealsProcentSum));
    }

    return setValue("maxMealsProcent", 0);
  }, [...meals.map((item) => item.procent)]);

  //poprawić
  useEffect(() => {
    if (kcal && meals) {
      const newMeals = meals.map((meal) => ({
        ...meal,
        kcal: meal.procent > 0 ? round2((meal.procent * kcal) / 100) : 0,
      }));

      return setValue("meals", newMeals);
    }

    return;
  }, [kcal, ...meals.map((item) => item.procent)]);

  // export const countProcent = (items: IProcentCount[]) => {
  //   const procent = items.reduce((acc, field) => acc + field.procent, 0);

  //   if (isNaN(procent)) {
  //     return 0;
  //   }

  //   return procent;
  // };

  //change meal procent and kcal
  // const changeMealKcal = (
  //   e: React.FormEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const newProcent = parseInt(e.currentTarget.value);
  //   const newKcal = countKcal(newProcent, dietKcal);
  //   setValue(`meals.${index}.procent`, newProcent);
  //   setValue(`meals.${index}.kcal`, newKcal);
  //   changeMaxProcent(meals);
  // };

  // //change max meals procent
  // const changeMaxProcent = (meals: IMeal[]) => {
  //   setValue("maxMealProcent", countProcent(meals));
  // };

  // const addMeal = () => {
  //   return append({
  //     type: "",
  //     procent: 0,
  //     kcal: 0,
  //     dinnerTypes: [{ type: "main" }, { type: "drink" }],
  //   });
  // };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // const value = !e.currentTarget.value
    //   ? e.currentTarget.value
    //   : parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    const value = parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    setValue(e.currentTarget.name, value);
  };

  return (
    <>
      <Styled.TotalProcentWrapper procent={totalMealsProcent}>
        <p>wartość % posiłków</p>
        <h3>{totalMealsProcent} %</h3>
      </Styled.TotalProcentWrapper>
      {fields.length > 1 &&
        fields.map((field, index) => (
          <Styled.FieldWrapper key={field.id}>
            <Styled.FieldHeadWrapper>
              <Styled.FieldNumberWrapper>
                <p>{index + 1}</p>
              </Styled.FieldNumberWrapper>

              <Styled.IconOptionsWrapper>
                <Styled.IconButtonWrapper
                  iconType="edit"
                  type="button"
                  onClick={() => removeMeal(index)}
                >
                  <FaEdit />
                </Styled.IconButtonWrapper>
                <Styled.IconButtonWrapper
                  iconType="delete"
                  type="button"
                  onClick={() => removeMeal(index)}
                >
                  <FaTrash />
                </Styled.IconButtonWrapper>
              </Styled.IconOptionsWrapper>
            </Styled.FieldHeadWrapper>

            <Input
              label={`${t("dietEstablishment.form.meals.time")} *`}
              type="text"
              name={`meals.${index}.time`}
              // disabled
              fullWidth
            />
            <Input
              label={`${t("dietEstablishment.form.meals.type")} *`}
              type="text"
              name={`meals.${index}.type`}
              // disabled
              fullWidth
            />
            <Input
              label={`${t("dietEstablishment.form.meals.name")} *`}
              type="text"
              name={`meals.${index}.name`}
              // disabled
              fullWidth
            />
            <Input
              label={`${t("dietEstablishment.form.meals.procent")} *`}
              type="number"
              name={`meals.${index}.procent`}
              // disabled
              fullWidth
              onChange={handleChange}
              controlled
            />
            <Input
              label={`${t("dietEstablishment.form.meals.kcal")} *`}
              type="number"
              name={`meals.${index}.kcal`}
              disabled
              fullWidth
            />
          </Styled.FieldWrapper>
        ))}

      <DashedSelect
        icon={<FaPlus />}
        text={t("dietEstablishment.form.meals.addMeal")}
        onClick={addMeal}
        fullWidth
      />
    </>
  );
};

export default Meals;
