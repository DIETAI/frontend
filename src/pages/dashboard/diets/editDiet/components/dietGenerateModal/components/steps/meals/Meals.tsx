import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";

//styles
import * as Styled from "./Meals.styles";

//components
import Day from "./custom/Day";
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";
import Default from "./defaultSettings/Default";

// //interfaces
import { IDietGenerateMealsSchema } from "../../../schema/dietGenerate.schema";
import { getDietDayMeals } from "services/getDietMeals";
// import { IUserSubscriptionPlanPrice } from "../../../schema/userSubscriptionPlan.schema";

const Meals = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const days = watch("days") as string[];
  const generateMealsSettings = watch(
    "generateMealsSettings"
  ) as IDietGenerateMealsSchema["generateMealsSettings"];

  const handleGenerateMealsSettings = (
    mealSettingsType: "changeAmountAddedMeals" | "saveAddedMeals" | "newMeals"
  ) => {
    setValue("generateMealsSettings", mealSettingsType);
  };

  // const mealsSettingType = watch(
  //   "mealsSettingType"
  // ) as IDietGenerateMealsSchema["mealsSettingType"];

  // const meals = days
  //   .map((day) => {
  //     const { dietDayMeals } = getDietDayMeals(day);

  //     if (!dietDayMeals) return [];
  //     return dietDayMeals;
  //   })
  //   .flatMap((daysMeal) => daysMeal); //wszystkie posiłki

  // useEffect(() => {
  //   setValue(
  //     "meals",
  //     meals.map((meal) => meal._id)
  //   );
  // }, [days]);

  // const checkAllMeals = () => {
  //   console.log("all");
  //   setValue("mealsSettingType", "default");
  //   // setValue(
  //   //   "meals",
  //   //   meals.map((meal) => meal._id)
  //   // );
  // };
  // const openDetailedSettings = () => {
  //   console.log("detail");
  //   setValue("mealsSettingType", "custom");
  // };

  return (
    <Styled.GenerateMealsWrapper>
      {/* {JSON.stringify(watch())} */}
      {/* <Styled.OptionsWrapper>
        <Styled.Option>
          <CheckBoxWrapper
            onClick={checkAllMeals}
            checked={mealsSettingType === "default"}
          />
          <span>zastosuj dla wszystkich dni</span>
        </Styled.Option>
        <Styled.Option>
          <CheckBoxWrapper
            onClick={openDetailedSettings}
            checked={mealsSettingType === "custom"}
          />
          <span>szczegółowe ustawienia</span>
        </Styled.Option>
      </Styled.OptionsWrapper> */}

      <Styled.OptionsWrapper>
        <Styled.Option>
          <CheckBoxWrapper
            onClick={() => handleGenerateMealsSettings("saveAddedMeals")}
            checked={generateMealsSettings === "saveAddedMeals"}
          />
          <span>zachowaj juz dodane posiłki</span>
        </Styled.Option>
        <Styled.Option>
          <CheckBoxWrapper
            onClick={() =>
              handleGenerateMealsSettings("changeAmountAddedMeals")
            }
            checked={generateMealsSettings === "changeAmountAddedMeals"}
          />
          <span>zachowaj juz dodane posiłki i dostosuj ilość</span>
        </Styled.Option>
        <Styled.Option>
          <CheckBoxWrapper
            onClick={() => handleGenerateMealsSettings("newMeals")}
            checked={generateMealsSettings === "newMeals"}
          />
          <span>zastąp już wybrane posiłki podczas generowania</span>
        </Styled.Option>
      </Styled.OptionsWrapper>
      <Default />

      {/* {mealsSettingType === "default" && <Default />} */}

      {/* {mealsSettingType === "custom" && (
        <Styled.DaysWrapper>
          {days.map((dayId) => (
            <Day key={dayId} dayId={dayId} />
          ))}
        </Styled.DaysWrapper>
      )} */}
    </Styled.GenerateMealsWrapper>
  );
};

export default Meals;
