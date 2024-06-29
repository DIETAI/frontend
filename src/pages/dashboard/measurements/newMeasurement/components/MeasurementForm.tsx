import React from "react";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useTranslation } from "react-i18next";

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

const NewMeasurementForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleAlert } = useAlert();

  const onMeasurementFormSubmit = async (data: IMeasurementValues) => {
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
    <MultiStepContainer
      defaultValues={defaultMeasurementValues}
      onSubmitAction={onMeasurementFormSubmit}
      validationSchema={allMeasurementSchemas}
    >
      <MultiStepSidebar
        icon={<FaUser />}
        title={t("measurement.sidebar.title")}
        pages={measurementSidebarPages}
      />
      <MultiStepFormContent>
        {measurementFormSteps.map((step) => (
          <FormStep
            key={step.id}
            icon={step.icon}
            label={step.title}
            validationSchema={step.validationSchema as any}
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

export default NewMeasurementForm;
