import React, { useEffect } from "react";

import axios from "utils/api";
import { useNavigate } from "react-router";

//components
import MultiStepFormContent from "../../../components/multiStepForm/multiStepContent/MultiStepContent";
import FormStep from "../../../components/multiStepForm/step/Step";

//steps
import { dinnerFormSteps } from "../../utils/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  basicInfoSchema,
  dinnerProductsSchema,
} from "../../schema/newDinner.schema";

const allDinnerSchemas = basicInfoSchema.concat(dinnerProductsSchema);
const defaultDinnerValues = allDinnerSchemas.cast({});
type IDinnerValues = typeof defaultDinnerValues;

const DinnerForm = () => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onDinnerFormSubmit = async (data: IDinnerValues) => {
    //zmiana isSubmitting
    //brak zmiany treści alertu
    //przekierowanie do edycji
    console.log("wysyłanie posiłku");
    console.log(data);

    try {
      const newDinner = await axios.post("/api/v1/dinners", data, {
        withCredentials: true,
      });
      console.log({ newDinner });
      handleAlert("success", "Dodano nowy posiłek");
      navigate(`/dashboard/dinners/edit/${newDinner.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie posiłku nie powiodło się");
    }
  };

  return (
    <MultiStepFormContent
      defaultValues={defaultDinnerValues}
      onSubmitAction={onDinnerFormSubmit}
      validationSchema={allDinnerSchemas}
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

export default DinnerForm;
