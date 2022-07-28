import React from "react";
import { useTranslation } from "react-i18next";
import * as Styled from "./ClientSidebarSteps.styles";
import { ISteps } from "../../../../../components/multiStepForm/multistepSidebar/MultiStepSidebar.interfaces";

interface IClientSidebarStepsProps {
  clientFormSteps: Omit<ISteps, "stepContent" | "validationSchema">[];
}

const ClientSidebarSteps = ({ clientFormSteps }: IClientSidebarStepsProps) => {
  const { t } = useTranslation();
  return (
    <Styled.SidebarStepsContainer>
      {clientFormSteps.map((step) => (
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

export default ClientSidebarSteps;
