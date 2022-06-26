import React from "react";
import * as Styled from "./Step.styles";
import { IFormStepProps } from "../multiStepContent/MultiStepContent.interfaces";
import { useTranslation } from "react-i18next";

const FormStep = ({ children, icon, label, sectionId }: IFormStepProps) => {
  const { t } = useTranslation();

  return (
    <Styled.StepWrapper id={sectionId}>
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>{icon}</Styled.IconWrapper>
        <h2>{t(label)}</h2>
      </Styled.StepHeadingWrapper>
      {children}
    </Styled.StepWrapper>
  );
};

export default FormStep;
