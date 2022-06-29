import React from "react";

//icons
import { FaBusinessTime, FaBuffer, FaCreditCard } from "icons/icons";

//steps content
import * as Step from "../components/steps";

//schema
import {
  userSubscriptionPlanSchema,
  userSubscriptionPlanPriceSchema,
  userSubscriptionPlanCheckoutSchema,
} from "../schema/userSubscriptionPlan.schema";

export const subscriptionPlanSteps = [
  {
    id: 1,
    icon: <FaBuffer />,
    name: "wybierz plan",
    step: <Step.PlanList />,
    validationSchema: userSubscriptionPlanSchema,
  },
  {
    id: 2,
    icon: <FaBusinessTime />,
    name: "długość planu",
    step: <Step.PlanLength />,
    validationSchema: userSubscriptionPlanPriceSchema,
  },
  {
    id: 3,
    icon: <FaCreditCard />,
    name: "płatność",
    step: <Step.Checkout />,
    validationSchema: userSubscriptionPlanCheckoutSchema,
  },
];
