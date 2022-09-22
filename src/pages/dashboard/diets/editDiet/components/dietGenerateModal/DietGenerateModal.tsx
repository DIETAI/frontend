import React, { useState } from "react";

//styles
import * as Styled from "./DietGenerateModal.styles";

//components
import Heading from "components/heading/Heading";
import MultiStepContainer from "./components/multistepContainer/MultistepContainer";
import { FormStep } from "./components/multistepContainer/MultistepContainer";

//icons
import { FaCalendarPlus } from "icons/icons";

//schema
import {
  dietGenerateDaysSchema,
  dietGenerateMealsSchema,
  dietGeneratePreferencesSchema,
} from "./schema/dietGenerate.schema";

// //styles
// import * as Styled from "./SubscriptionPlansPage.styles";

// //utils
import { dietGenerateSteps } from "./utils/steps";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

const defaultValues = dietGenerateDaysSchema
  .concat(dietGenerateMealsSchema)
  .concat(dietGeneratePreferencesSchema)
  .cast({});

export type IDietGenerateValues = typeof defaultValues;

const DietGenerateModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <Styled.DietGenerateModalContainer>
      <Heading
        icon={<FaCalendarPlus />}
        title="Generuj dietę"
        // description={t("dinner.form.products.modal.description")}
      />
      <MultiStepContainer defaultValues={defaultValues} closeModal={closeModal}>
        {dietGenerateSteps.map(({ step, name, icon, id, validationSchema }) => (
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
    </Styled.DietGenerateModalContainer>
  );
};

export default DietGenerateModal;
