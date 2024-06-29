import React from "react";
import { useNavigate } from "react-router";

//components
import MultiStepContainer from "./components/multistepContainer/MultistepContainer";
import { FormStep } from "./components/multistepContainer/MultistepContainer";

//styles
import * as Styled from "./SubscriptionPlansPage.styles";

//utils
import { subscriptionPlanSteps } from "./utils/steps";

//schema
import {
  userSubscriptionPlanSchema,
  userSubscriptionPlanPriceSchema,
  userSubscriptionPlanCheckoutSchema,
} from "./schema/userSubscriptionPlan.schema";

const defaultValues = userSubscriptionPlanSchema
  .concat(userSubscriptionPlanPriceSchema)
  .concat(userSubscriptionPlanCheckoutSchema)
  .cast({});

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  return (
    <Styled.SubscriptionPlansContainer>
      <MultiStepContainer defaultValues={defaultValues}>
        {subscriptionPlanSteps.map(
          ({ step, name, icon, id, validationSchema }) => (
            <FormStep
              key={id}
              label={name}
              icon={icon}
              validationSchema={validationSchema as any}
            >
              {step}
            </FormStep>
          )
        )}
      </MultiStepContainer>

      <button onClick={() => navigate("/dashboard/home")}>
        powrót do panelu
      </button>
    </Styled.SubscriptionPlansContainer>
  );
};

export default SubscriptionPlans;
