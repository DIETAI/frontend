import React from "react";

//icons
import { FaBusinessTime, FaBuffer, FaCreditCard } from "icons/icons";

//steps content
import * as Step from "../steps/index";

//schema
import {
  dietDinnerSchema,
  dietDinnerPortionSchema,
} from "../AddDinnerModel.schema";

export const dietDinnerSteps = [
  {
    id: 1,
    icon: <FaBuffer />,
    name: "posiłek/produkt",
    step: <Step.Dinner />,
    validationSchema: dietDinnerSchema,
  },
  {
    id: 2,
    icon: <FaBusinessTime />,
    name: "porcja",
    step: <Step.DinnerPortion />,
    validationSchema: dietDinnerPortionSchema,
  },
];
