import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";

//components
import MultiStepFormContent from "../../../components/multiStepForm/multiStepContent/MultiStepContent";
import FormStep from "../../../components/multiStepForm/step/Step";

//steps
import { dinnerFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//interfaces
import { IDinnerProps } from "interfaces/dinner.interfaces";

//schema
import {
  basicInfoSchema,
  dinnerProductsSchema,
} from "../../schema/newDinner.schema";

const allDinnerSchemas = basicInfoSchema.concat(dinnerProductsSchema);
const defaultDinnerValues = allDinnerSchemas.cast({});
type IDinnerValues = typeof defaultDinnerValues;

const EditDinnerForm = ({ dinner }: IDinnerProps) => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onDinnerFormSubmit = async (data: IDinnerValues) => {
    console.log("edytowanie posiłku");
    console.log(data);
    try {
      const editDinner = await axios.put(
        `/api/v1/dinners/${dinner._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editDinner });
      handleAlert("success", "Edytowano posiłek");
      // navigate(`/dashboard/measurements/edit/${editMeasurement.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie posiłku nie powiodło się");
    }
  };

  return (
    <MultiStepFormContent
      defaultValues={dinner}
      onSubmitAction={onDinnerFormSubmit}
      validationSchema={allDinnerSchemas}
      itemId={dinner._id}
      itemCreatedAt={dinner.createdAt}
      itemUpdatedAt={dinner.updatedAt}
    >
      {dinnerFormSteps.map((step) => (
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

export default EditDinnerForm;
