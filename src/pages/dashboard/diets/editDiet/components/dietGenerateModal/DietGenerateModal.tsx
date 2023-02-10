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
} from "./schema/dietGenerate.schema";

//utils
import { dietGenerateSteps } from "./utils/steps";

const defaultValues = dietGenerateDaysSchema
  .concat(dietGenerateMealsSchema)
  .cast({});

export type IDietGenerateValues = typeof defaultValues;

export type DietGenerateState = "prepare" | "loading" | "generated";

const DietGenerateModal = ({ closeModal }: { closeModal: () => void }) => {
  const [generateDiet, setGenerateDiet] =
    useState<DietGenerateState>("prepare");

  if (generateDiet === "prepare") {
    return (
      <Styled.DietGenerateModalContainer>
        <Heading icon={<FaCalendarPlus />} title="Generuj dietę" />
        <MultiStepContainer
          defaultValues={defaultValues}
          setGenerateDiet={setGenerateDiet}
          closeModal={closeModal}
        >
          {dietGenerateSteps.map(
            ({ step, name, icon, id, validationSchema }) => (
              <FormStep
                key={id}
                label={name}
                icon={icon}
                validationSchema={validationSchema}
              >
                {step}
              </FormStep>
            )
          )}
        </MultiStepContainer>
      </Styled.DietGenerateModalContainer>
    );
  }

  if (generateDiet === "loading") {
    return <div>przygotowanie do generowania diety</div>;
  }

  return (
    <div>
      <h2>wygenerowane dni</h2> <button>generuj ponownie</button>{" "}
      <button>dodaj do jadłospisu</button>{" "}
      <button>zmień założenia generowania</button>{" "}
    </div>
  );
};

export default DietGenerateModal;
