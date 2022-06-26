import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { FieldValues } from "react-hook-form";
import axios from "utils/api";

//components
import MultiStepFormContent from "../../../components/multiStepForm/multiStepContent/MultiStepContent";
import FormStep from "../../../components/multiStepForm/step/Step";

//schema
import {
  measurementInformationsSchema,
  measurementBasicDataSchema,
  measurementAdditionalDataSchema,
} from "../../schema/newMeasurement.schema";

//utils
import { measurementFormSteps } from "../../utlis/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

const allMeasurementSchemas = measurementInformationsSchema
  .concat(measurementBasicDataSchema)
  .concat(measurementAdditionalDataSchema);

const defaultMeasurementValues = allMeasurementSchemas.cast({});
type IMeasurementValues = typeof defaultMeasurementValues;

const MeasurementForm = () => {
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onMeasurementFormSubmit = async (data: IMeasurementValues) => {
    //zmiana isSubmitting
    //brak zmiany treści alertu
    //przekierowanie do edycji
    console.log("wysyłanie pomiaru");
    console.log(data);

    try {
      const newMeasurement = await axios.post("/api/v1/measurements", data, {
        withCredentials: true,
      });
      console.log({ newMeasurement });
      handleAlert("success", "Dodano nowy pomiar");
      navigate(`/dashboard/measurements/edit/${newMeasurement.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie pomiaru nie powiodło się");
    }
  };

  return (
    <MultiStepFormContent
      defaultValues={defaultMeasurementValues}
      onSubmitAction={onMeasurementFormSubmit}
      validationSchema={allMeasurementSchemas}
    >
      {measurementFormSteps.map((step) => (
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

export default MeasurementForm;
