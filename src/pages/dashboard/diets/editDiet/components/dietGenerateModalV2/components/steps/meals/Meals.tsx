import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

//styles
import * as Styled from "./Meals.styles";

//components
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";
import Default from "./defaultSettings/Default";

//interfaces
import { IDietGenerateMealsSchema } from "../../../schema/dietGenerate.schema";

const Meals = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const generateMealsSettings = watch(
    "generateMealsSettings"
  ) as IDietGenerateMealsSchema["generateMealsSettings"];

  const handleGenerateMealsSettings = (
    mealSettingsType: "changeAmountAddedMeals" | "saveAddedMeals" | "newMeals"
  ) => {
    setValue("generateMealsSettings", mealSettingsType);
  };

  return (
    <Styled.GenerateMealsWrapper>
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
    </Styled.GenerateMealsWrapper>
  );
};

export default Meals;
