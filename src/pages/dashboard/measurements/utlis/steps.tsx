import React from "react";

//icons
import { FaInfoCircle, FaWeight, FaWeightHanging } from "icons/icons";

//components
import * as Step from "../components/form/steps";

//schema
import {
  measurementInformationsSchema,
  measurementBasicDataSchema,
  measurementAdditionalDataSchema,
} from "../schema/newMeasurement.schema";

export const measurementFormSteps = [
  {
    id: 1,
    requiredFields: true,
    title: "measurement.form.informations.heading", //i18next
    description: "measurement.form.informations.description",
    icon: <FaInfoCircle />,
    validationSchema: measurementInformationsSchema,
    stepContent: <Step.Informations />,
    sectionId: "measurement_form_1",
  },
  {
    id: 2,
    requiredFields: true,
    title: "measurement.form.basicData.heading",
    description: "measurement.form.basicData.description",
    icon: <FaWeight />,
    validationSchema: measurementBasicDataSchema,
    stepContent: <Step.BasicData />,
    sectionId: "measurement_form_2",
  },
  {
    id: 3,
    requiredFields: false,
    title: "measurement.form.additionalData.heading",
    description: "measurement.form.additionalData.description",
    icon: <FaWeightHanging />,
    validationSchema: measurementAdditionalDataSchema,
    stepContent: <Step.AdditionalData />,
    sectionId: "measurement_form_3",
  },
];
