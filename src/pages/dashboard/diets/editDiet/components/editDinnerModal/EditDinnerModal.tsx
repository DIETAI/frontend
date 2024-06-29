import React, { useEffect } from "react";
import { useParams } from "react-router";

//components
import MultiStepContainer, {
  FormStep,
} from "./multistepContainer/MultistepContainer";
import Heading from "components/heading/Heading";

//styles
import * as Styled from "../addDinnerModal/AddDinnerModal.styles";

//icons
import { FaUserCog, FaUtensils } from "icons/icons";

//utils
import { editDietDinnerSteps } from "./utils/steps";

import { IDietDinnerPopulateData } from "interfaces/diet/dietPopulate.interfaces";

const EditDinnerModal = ({
  closeModal,
  dietDinner,
}: {
  closeModal: () => void;
  dietDinner: IDietDinnerPopulateData;
}) => {
  const { dietEditId } = useParams();

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
      <Heading icon={<FaUtensils />} title={"Edytuj posiłek"} />
      <MultiStepContainer
        defaultValues={editDinnerDefaultValues}
        closeModal={closeModal}
        dietDinnerId={dietDinner._id}
      >
        {editDietDinnerSteps.map(
          ({ step, name, icon, id, validationSchema }) => (
            <FormStep
              key={id}
              label={name}
              icon={icon}
              validationSchema={validationSchema as any}
            >
              {step}
            </FormStep>
          )
        )}
      </MultiStepContainer>
    </Styled.DinnerModalContainer>
  );
};

export default EditDinnerModal;
