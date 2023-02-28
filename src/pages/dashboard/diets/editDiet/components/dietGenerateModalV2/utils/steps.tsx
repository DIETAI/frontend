import React from "react";

//icons
import { FaUtensils, FaCalendarWeek } from "icons/icons";

//steps content
import * as Step from "../components/steps";

//schema
import {
  dietGenerateDaysSchema,
  dietGenerateMealsSchema,
  // dietGeneratePreferencesSchema,
} from "../schema/dietGenerate.schema";

export const dietGenerateSteps = [
  {
    id: 1,
    icon: <FaCalendarWeek />,
    name: "wybierz dni",
    step: <Step.Days />,
    validationSchema: dietGenerateDaysSchema,
  },
  {
    id: 2,
    icon: <FaUtensils />,
    name: "wybierz posiłki",
    step: <Step.Meals />,
    validationSchema: dietGenerateMealsSchema,
  },
  // {
  //   id: 3,
  //   icon: <FaHeart />,
  //   name: "preferencje",
  //   step: <Step.Preferences />,
  //   validationSchema: dietGeneratePreferencesSchema,
  // },
];
