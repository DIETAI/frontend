import React from "react";
import { useParams } from "react-router";

//translation
import { useTranslation } from "react-i18next";

//components
import MultiStepContainer from "./multistepContainer/MultistepContainer";
import { FormStep } from "./multistepContainer/MultistepContainer";
import Heading from "components/heading/Heading";

//styles
import * as Styled from "./AddDinnerModal.styles";

//icons
import { FaUtensils } from "icons/icons";

//utils
import { dietDinnerSteps } from "./utils/steps";

//interfaces
import { IDinnerModalProps } from "./AddDinnerModal.interfaces";

//schema
import {
  dietDinnerPortionSchema,
  dietDinnerSchema,
} from "./AddDinnerModel.schema";

const defaultValues = dietDinnerSchema.concat(dietDinnerPortionSchema).cast({});

const AddDinnerModal = ({ closeModal, meal }: IDinnerModalProps) => {
  const { dietEditId } = useParams();
  const { t } = useTranslation();

  const addDinnerDefaultValues = {
    ...defaultValues,
    dietId: dietEditId,
    dayId: meal.dayId,
    dietMealId: meal._id,
    order: meal.dietDinners.length + 1,
    mealType: meal.type,
  };

  return (
    <Styled.DinnerModalContainer>
      <Heading icon={<FaUtensils />} title="Dodaj posiłek" />
      <MultiStepContainer
        defaultValues={addDinnerDefaultValues}
        closeModal={closeModal}
      >
        {dietDinnerSteps.map(({ step, name, icon, id, validationSchema }) => (
          <FormStep
            key={id}
            label={name}
            icon={icon}
            validationSchema={validationSchema}
          >
            {step}
          </FormStep>
        ))}
      </MultiStepContainer>
    </Styled.DinnerModalContainer>
  );
};

export default AddDinnerModal;
