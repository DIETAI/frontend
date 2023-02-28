import React, { useState } from "react";

//styles
import * as Styled from "./DietGenerateNav.styles";

//utils
import { dietGenerateSteps } from "../../utils/steps";

interface IDietGenerateNavProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  valid: boolean;
  isLastStep: boolean;
}

const DietGenerateNav = ({
  activePage,
  setActivePage,
  valid,
}: IDietGenerateNavProps) => {
  const validItem = (itemIndex: number) => {
    if (itemIndex - activePage > 1) {
      return false;
    }

    if (!valid && itemIndex > activePage) {
      return false;
    }

    return true;
  };

  return (
    <Styled.NavWrapper>
      {dietGenerateSteps.map((step, stepIndex) => (
        <Styled.NavItem
          valid={validItem(stepIndex)}
          key={step.id}
          active={stepIndex === activePage}
          onClick={() => setActivePage(stepIndex)}
        >
          {step.icon}
          <h2>{step.name}</h2>
        </Styled.NavItem>
      ))}
    </Styled.NavWrapper>
  );
};

export default DietGenerateNav;
