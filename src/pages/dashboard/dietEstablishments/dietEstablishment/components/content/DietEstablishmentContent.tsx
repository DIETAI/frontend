import React from "react";

//styles
import * as Styled from "./DietEstablishmentContent.styles";

//components
import * as DietEstablishmentStep from "./steps";

const DietEstablishmentContent = () => {
  return (
    <Styled.DietEstablishmentContentWrapper>
      <DietEstablishmentStep.BasicInfo />
      <DietEstablishmentStep.Meals />
      <DietEstablishmentStep.Macrohydrates />
      <DietEstablishmentStep.FattyAcids />
      <DietEstablishmentStep.Vitamins />
      <DietEstablishmentStep.Minerals />
    </Styled.DietEstablishmentContentWrapper>
  );
};

export default DietEstablishmentContent;
