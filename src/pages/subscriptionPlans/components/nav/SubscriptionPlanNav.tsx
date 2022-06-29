import React, { useState } from "react";

//styles
import * as Styled from "./SubscriptionPlanNav.styles";

//utils
import { subscriptionPlanSteps } from "../../utils/steps";

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
  // const [activeItem, setActiveItem] = useState(subscriptionPlanSteps[0].id);

  // const currentPage = activePage === link.id;

  // const notValid =
  //   (!valid && link.id > activePage) ||
  //   !links
  //     .slice(0, activePage + 2)
  //     .map((link) => link.id)
  //     .includes(link.id);

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
    <Styled.SubscriptionPlanNavWrapper>
      {subscriptionPlanSteps.map((step, stepIndex) => (
        <Styled.SubscriptionPlanNavItem
          valid={validItem(stepIndex)}
          key={step.id}
          active={stepIndex === activePage}
          onClick={() => setActivePage(stepIndex)}
        >
          {step.icon}
          <h2>{step.name}</h2>
        </Styled.SubscriptionPlanNavItem>
      ))}
    </Styled.SubscriptionPlanNavWrapper>
  );
};

export default SubscriptionPlanNav;
