import React from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./MeasurementSidebarSteps.styles";
import { ISteps } from "../../../../../components/multiStepForm/multistepSidebar/MultiStepSidebar.interfaces";

interface IMeasurementSidebarStepsProps {
  measurementFormSteps: Omit<ISteps, "stepContent" | "validationSchema">[];
}

const MeasurementSidebarSteps = ({
  measurementFormSteps,
}: IMeasurementSidebarStepsProps) => {
  const { t } = useTranslation();
  return (
    <Styled.SidebarStepsContainer>
      {measurementFormSteps.map((step) => (
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

export default MeasurementSidebarSteps;
