import React, { useEffect } from "react";

//icons
import {
  FaCarrot,
  FaInfoCircle,
  FaWeight,
  FaClipboardList,
  FaDisease,
} from "icons/icons";

//components
import * as Step from "../components/form/steps";

//schema
import {
  clientBasicInfoSchema,
  clientAimsSchema,
  clientMeasurementsSchema,
  clientDiseasesSchema,
  clientNutritionalInterviewSchema,
} from "../schema/newClient.schema";

export const clientFormSteps = [
  {
    id: 1,
    requiredFields: true,
    title: "client.form.basic_info.heading", //i18next
    description: "client.form.basic_info.info",
    icon: <FaInfoCircle />,
    validationSchema: clientBasicInfoSchema,
    stepContent: <Step.BasicInfo />,
    sectionId: "client_form_1",
  },
  {
    id: 2,
    requiredFields: true,
    title: "client.form.diseases.heading",
    description: "client.form.diseases.info",
    icon: <FaDisease />,
    validationSchema: clientDiseasesSchema,
    stepContent: <Step.Diseases />,
    sectionId: "client_form_2",
  },
  {
    id: 3,
    requiredFields: true,
    title: "client.form.aims.heading",
    description: "client.form.aims.info",
    icon: <FaWeight />,
    validationSchema: clientAimsSchema,
    stepContent: <Step.Aims />,
    sectionId: "client_form_3",
  },
  // {
  //   id: 4,
  //   requiredFields: true,
  //   title: "client.form.measurement.heading",
  //   description: "client.form.measurement.info",
  //   icon: <FaWeight />,
  //   validationSchema: clientMeasurementsSchema,
  //   stepContent: <Step.Measurements />,
  //   sectionId: "client_form_4",
  // },
  {
    id: 4,
    requiredFields: true,
    title: "client.form.interview.heading",
    description: "client.form.interview.info",
    icon: <FaClipboardList />,
    validationSchema: clientNutritionalInterviewSchema,
    stepContent: <Step.Interview />,
    sectionId: "client_form_4",
  },
];
