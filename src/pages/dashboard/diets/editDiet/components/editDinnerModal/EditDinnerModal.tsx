import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

//translation
import { useTranslation } from "react-i18next";

//components
import MultiStepContainer from "./multistepContainer/MultistepContainer";
import { FormStep } from "./multistepContainer/MultistepContainer";
import Heading from "components/heading/Heading";

//styles
import * as Styled from "../addDinnerModal/AddDinnerModal.styles";

//icons
import { FaUserCog } from "icons/icons";

//utils
import { dietDinnerSteps } from "../addDinnerModal/utils/steps";

//interfaces
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

//schema
import {
  dietDinnerPortionSchema,
  dietDinnerSchema,
} from "../addDinnerModal/AddDinnerModel.schema";
import { IDietDinnerPopulateData } from "interfaces/diet/dietPopulate.interfaces";

const defaultValues = dietDinnerSchema.concat(dietDinnerPortionSchema).cast({});

const EditDinnerModal = ({
  closeModal,
  dietDinner,
}: {
  closeModal: () => void;
  dietDinner: IDietDinnerPopulateData;
}) => {
  const { dietEditId } = useParams();
  const { t } = useTranslation();

  const editDinnerDefaultValues = {
    dietId: dietEditId,
    dayId: dietDinner.dayId,
    dietMealId: dietDinner.dietMealId,
    order: 1,
    dinnerId: dietDinner.dinnerPortionId.dinnerId._id,
    dinnerPortionId: dietDinner.dinnerPortionId._id,
  };

  return (
    <Styled.DinnerModalContainer>
      <Heading
        icon={<FaUserCog />}
        title={dietDinner.dinnerPortionId.dinnerId.name}
      />
      <MultiStepContainer
        defaultValues={editDinnerDefaultValues}
        closeModal={closeModal}
        dietDinnerId={dietDinner._id}
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

export default EditDinnerModal;
