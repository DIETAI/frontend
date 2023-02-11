import React from "react";

import axios from "utils/api";

import { IMeasurementProps } from "../../interfaces/measurement.interfaces";

//icons
import { FaUser } from "icons/icons";

//components
import MultiStepFormContent from "../../../components/multiStepFormv2/multiStepContent/MultiStepContent";
import MultiStepContainer from "../../../components/multiStepFormv2/multiStepContainer/MultiStepContainer";
import MultiStepSidebar from "../../../components/multiStepFormv2/multistepSidebar/MultiStepSidebar";
import MeasurementSidebarSteps from "../../components/form/sidebar/steps/MeasurementSidebarSteps";
import FormStep from "../../../components/multiStepFormv2/step/Step";

//steps
import { measurementFormSteps } from "../../utlis/steps";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import {
  measurementInformationsSchema,
  measurementBasicDataSchema,
  measurementAdditionalDataSchema,
} from "../../schema/newMeasurement.schema";

const allMeasurementSchemas = measurementInformationsSchema
  .concat(measurementBasicDataSchema)
  .concat(measurementAdditionalDataSchema);

const defaultMeasurementValues = allMeasurementSchemas.cast({});
type IMeasurementValues = typeof defaultMeasurementValues;

const measurementSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: (
      <MeasurementSidebarSteps measurementFormSteps={measurementFormSteps} />
    ),
  },
];

const EditMeasurementForm = ({ measurement }: IMeasurementProps) => {
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
    } catch (e) {
      console.log(e);
      handleAlert("error", "Edytowanie pomiaru nie powiodło się");
    }
  };

  const measurementDefaultValues = {
    ...measurement,
  };

  return (
    <MultiStepContainer
      defaultValues={measurementDefaultValues}
      onSubmitAction={onMeasurementFormSubmit}
      validationSchema={allMeasurementSchemas}
    >
      <MultiStepSidebar
        icon={<FaUser />}
        title={measurement.name}
        pages={measurementSidebarPages}
      />
      <MultiStepFormContent
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
    </MultiStepContainer>
  );
};

export default EditMeasurementForm;
