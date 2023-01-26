import React, { useState } from "react";

//icons
import { FaUtensils } from "icons/icons";

//styles
import * as Styled from "./MealGenerateModal.styles";

//components
import Heading from "components/heading/Heading";

import * as Step from "./steps";
import { IDietMealPopulateData } from "interfaces/diet/dietPopulate.interfaces";

type ActiveStep = "generateMealSettings" | "generatedMeal";

interface IMealGenerateModalProps {
  meal: IDietMealPopulateData;
  closeModal: () => void;
}

const MealGenerateModal = ({ meal, closeModal }: IMealGenerateModalProps) => {
  const [activeStep, setActiveStep] = useState<ActiveStep>(
    "generateMealSettings"
  );

  const generateMeal = async () => {
    console.log("generate meal");
    //set generate state

    //recommendMeal
    //rekomenduje meal id który jest przekazywany do generateMeal

    //generateMeal

    //setNewMealDinners
  };

  const addMealToDiet = async () => {
    console.log("add meal to diet");
  };

  return (
    <Styled.GenerateMealModalContainer>
      <Heading icon={<FaUtensils />} title="Generowanie posiłku" />
      <Styled.MealGenerateContentWrapper>
        {activeStep === "generateMealSettings" && (
          <Step.GenerateMealSettings
            mealDinnersLength={meal.dietDinners.length}
            closeModal={closeModal}
            generateMeal={generateMeal}
          />
        )}
        {activeStep === "generatedMeal" && (
          <Step.GeneratedMeal
            mealName={meal.name}
            closeModal={closeModal}
            generateMeal={generateMeal}
            addMealToDiet={addMealToDiet}
          />
        )}
      </Styled.MealGenerateContentWrapper>
    </Styled.GenerateMealModalContainer>
  );
};

export default MealGenerateModal;
