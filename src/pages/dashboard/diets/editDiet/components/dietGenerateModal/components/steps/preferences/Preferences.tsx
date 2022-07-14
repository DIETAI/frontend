import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";

//styles
import * as Styled from "./Preferences.styles";

// //interfaces
// import { IUserSubscriptionPlanPrice } from "../../../schema/userSubscriptionPlan.schema";

const PlanLength = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  // const subscriptionPlanId = getValues("subscriptionPlanId") as string;
  // const selectedPlanTime = watch(
  //   "stripePriceId"
  // ) as IUserSubscriptionPlanPrice["stripePriceId"];

  // const { subscriptionPlan, subscriptionPlanError, subscriptionPlanLoading } =
  //   getSubscriptionPlan(subscriptionPlanId);

  // if (subscriptionPlanLoading) return <div>loading...</div>;
  // if (subscriptionPlanError) return <div>error..</div>;

  // const changePlanTime = (
  //   stripePriceId: IUserSubscriptionPlanPrice["stripePriceId"]
  // ) => {
  //   setValue("stripePriceId", stripePriceId);
  //   trigger();
  // };

  return (
    <Styled.PlanTimeContainer>
      {/* <h2>Plan: {subscriptionPlan?.name}</h2>
      {subscriptionPlan?.variants.map((variant) => (
        <Styled.PlanLTimeItemWrapper
          onClick={() => changePlanTime(variant.stripePriceId)}
          key={variant.stripePriceId}
          selectedTimePlan={variant.stripePriceId === selectedPlanTime}
        >
          <h3>nazwa: {variant.name}</h3> <h3>cena: {variant.price}</h3>
        </Styled.PlanLTimeItemWrapper>
      ))} */}
    </Styled.PlanTimeContainer>
  );
};

export default PlanLength;
