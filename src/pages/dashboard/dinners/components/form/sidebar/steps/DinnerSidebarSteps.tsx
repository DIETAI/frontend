import React from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./DinnerSidebarSteps.styles";
import { ISteps } from "../../../../../components/multiStepForm/multistepSidebar/MultiStepSidebar.interfaces";

interface IDinnerSidebarStepsProps {
  dinnerFormSteps: Omit<ISteps, "stepContent" | "validationSchema">[];
}

const DinnerSidebarSteps = ({ dinnerFormSteps }: IDinnerSidebarStepsProps) => {
  const { t } = useTranslation();
  return (
    <Styled.SidebarStepsContainer>
      {dinnerFormSteps.map((step) => (
        <Styled.SidebarStepWrapper
          key={step.id}
          onClick={() => window.location.replace(`#${step.sectionId}`)}
        >
          {step.requiredFields && (
            <Styled.SidebarStepInfo>
              {t("form.sidebar.requiredFields")}
            </Styled.SidebarStepInfo>
          )}

          <h2>{t(step.title)}</h2>
          <p>{t(step.description)}</p>
          <span className="step-cursor">{step.id}</span>
        </Styled.SidebarStepWrapper>
      ))}
    </Styled.SidebarStepsContainer>
  );
};

export default DinnerSidebarSteps;
