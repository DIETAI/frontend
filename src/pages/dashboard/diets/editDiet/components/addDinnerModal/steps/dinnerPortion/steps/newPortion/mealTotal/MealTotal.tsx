import React from "react";

import * as Styled from "./MealTotal.styles";

//form
import { useFormContext } from "react-hook-form";
// import { IDinnerPortion } from "../schema/dinnerPortion.schema";

const MealTotal = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  // const dinnerPortionTotal = watch("total") as IDinnerPortion["total"];

  return (
    <Styled.MealTotalWrapper>
      <h2>Razem:</h2>
      <Styled.MealTotalFeaturesWrapper>
        <Styled.MealTotalFeature>
          Kcal: <b>200</b>
        </Styled.MealTotalFeature>
        {/* <Styled.MealTotalFeature>
          B (g): <b>{dinnerPortionTotal.protein.gram}</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          T (g): <b>{dinnerPortionTotal.fat.gram}</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          W (g): <b>{dinnerPortionTotal.carbohydrates.gram}</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          Wp (g): <b>{dinnerPortionTotal.digestableCarbohydrates.gram}</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          Bł (g): <b>{dinnerPortionTotal.fiber.gram}</b>
        </Styled.MealTotalFeature> */}
      </Styled.MealTotalFeaturesWrapper>
    </Styled.MealTotalWrapper>
  );
};

export default MealTotal;
