import React, { useState } from "react";

//styles
import * as Styled from "./EditDinnerNav.styles";

//utils
import { editDietDinnerSteps } from "../utils/steps";

interface ISubscriptionPlanNavProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  valid: boolean;
  isLastStep: boolean;
}

const SubscriptionPlanNav = ({
  activePage,
  setActivePage,
  valid,
  isLastStep,
}: ISubscriptionPlanNavProps) => {
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
      {editDietDinnerSteps.map((step, stepIndex) => (
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

export default SubscriptionPlanNav;
