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
import { useAlert } from "layout/dashboard/context/alert.context";
import { IMeasurementProps } from "../../interfaces/measurement.interfaces";

const allMeasurementSchemas = measurementInformationsSchema
  .concat(measurementBasicDataSchema)
  .concat(measurementAdditionalDataSchema);

const defaultMeasurementValues = allMeasurementSchemas.cast({});
type IMeasurementValues = typeof defaultMeasurementValues;

const EditMeasurementForm = ({ measurement }: IMeasurementProps) => {
  // const editMeasurementValues: IMeasurementValues = {
  //   ...measurement
  // };

  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const onMeasurementFormSubmit = async (data: IMeasurementValues) => {
    console.log("edytowanie pomiaru");
    console.log(data);
    try {
      const editMeasurement = await axios.put(
        `/api/v1/measurements/${measurement._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log({ editMeasurement });
      handleAlert("success", "Edytowano pomiar");
      // navigate(`/dashboard/measurements/edit/${editMeasurement.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie pomiaru nie powiodło się");
    }
  };

  return (
    <MultiStepFormContent
      defaultValues={measurement}
      onSubmitAction={onMeasurementFormSubmit}
      validationSchema={allMeasurementSchemas}
      itemId={measurement._id}
      itemCreatedAt={measurement.createdAt}
      itemUpdatedAt={measurement.updatedAt}
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

export default EditMeasurementForm;
