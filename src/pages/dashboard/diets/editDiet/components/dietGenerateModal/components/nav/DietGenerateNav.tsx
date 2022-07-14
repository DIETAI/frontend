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
  isLastStep,
}: IDietGenerateNavProps) => {
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
    <Styled.DietGenerateNavWrapper>
      {dietGenerateSteps.map((step, stepIndex) => (
        <Styled.DietGenerateNavItem
          valid={validItem(stepIndex)}
          key={step.id}
          active={stepIndex === activePage}
          onClick={() => setActivePage(stepIndex)}
        >
          {step.icon}
          <h2>{step.name}</h2>
        </Styled.DietGenerateNavItem>
      ))}
    </Styled.DietGenerateNavWrapper>
  );
};

export default DietGenerateNav;
