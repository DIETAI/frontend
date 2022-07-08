import React from "react";

import * as Styled from "./MealTotal.styles";

const MealTotal = () => {
  return (
    <Styled.MealTotalWrapper>
      <h2>Razem:</h2>
      <Styled.MealTotalFeaturesWrapper>
        <Styled.MealTotalFeature>
          Kcal: <b>200</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          B: <b>20g</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          T: <b>20g</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          W: <b>20g</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          Wp: <b>20g</b>
        </Styled.MealTotalFeature>
        <Styled.MealTotalFeature>
          Bł: <b>20g</b>
        </Styled.MealTotalFeature>
      </Styled.MealTotalFeaturesWrapper>
    </Styled.MealTotalWrapper>
  );
};

export default MealTotal;
