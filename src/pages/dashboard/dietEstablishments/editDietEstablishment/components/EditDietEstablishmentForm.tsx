import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";

//components
import MultiStepFormContent from "../../../components/multiStepForm/multiStepContent/MultiStepContent";
import FormStep from "../../../components/multiStepForm/step/Step";

//schema
import {
  establishmentBasicInfoSchema,
  establishmentMealsSchema,
  establishmentMacrohydratesSchema,
  establishmentFattyAcidsSchema,
  establishmentVitaminsSchema,
  establishmentMineralsSchema,
} from "../../schema/dietEstablishment.schema";

//utils
import { dietEstablishmentsFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//interfaces
import { IDietEstablishmentProps } from "interfaces/dietEstablishment.interfaces";

const allDietEstablishmentSchemas = establishmentBasicInfoSchema
  .concat(establishmentMealsSchema)
  .concat(establishmentMacrohydratesSchema)
  .concat(establishmentFattyAcidsSchema)
  .concat(establishmentVitaminsSchema)
  .concat(establishmentMineralsSchema);

const defaultDietEstablishmentsValues = allDietEstablishmentSchemas.cast({});
type IDietEstablishmentValues = typeof defaultDietEstablishmentsValues;

const EditDietEstablishmentForm = ({
  dietEstablishment,
}: IDietEstablishmentProps) => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onDietEstablishmentFormSubmit = async (
    data: IDietEstablishmentValues
  ) => {
    console.log("edytowanie założeń żywieniowych ");
    console.log(data);
    try {
      const editDietEstablishment = await axios.put(
        `/api/v1/dietEstablishments/${dietEstablishment._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editDietEstablishment });
      handleAlert("success", "Edytowano założenia żywieniowe");
      // navigate(`/dashboard/measurements/edit/${editMeasurement.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie założeń nie powiodło się");
    }
  };

  const defaultEst = {
    ...dietEstablishment,
    vitaminB1: { amount: 1.3, unit: "mg" },
  };

  return (
    <MultiStepFormContent
      defaultValues={defaultEst}
      onSubmitAction={onDietEstablishmentFormSubmit}
      validationSchema={allDietEstablishmentSchemas}
      itemId={dietEstablishment._id}
      itemCreatedAt={dietEstablishment.createdAt}
      itemUpdatedAt={dietEstablishment.updatedAt}
    >
      {dietEstablishmentsFormSteps.map((step) => (
        <FormStep
          key={step.id}
          icon={step.icon}
          label={step.title}
          validationSchema={step.validationSchema}
          id={step.sectionId}
          sectionId={step.sectionId}
        >
          {step.stepContent}
        </FormStep>
      ))}
    </MultiStepFormContent>
  );
};

export default EditDietEstablishmentForm;
