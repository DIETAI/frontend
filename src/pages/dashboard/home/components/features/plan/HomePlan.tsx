import React from "react";

//styles
import * as Styled from "./HomePlan.styles";

const HomePlan = () => {
  return (
    <Styled.HomeMeasurementItem>
      {/* <Styled.ItemLength>{index + 1}</Styled.ItemLength> */}
      <Styled.ItemContentWrapper>
        <h2>Plan standard</h2>
        <p>20.06.2022 - 20.07.2022</p>
      </Styled.ItemContentWrapper>
    </Styled.HomeMeasurementItem>
  );
};

export default HomePlan;
