import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";

//styles
import * as Styled from "./PlanTime.styles";

//interfaces
import { IUserSubscriptionPlanPrice } from "../../../schema/userSubscriptionPlan.schema";

const PlanLength = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  const subscriptionPlanId = getValues("subscriptionPlanId") as string;
  const selectedPlanTime = watch(
    "planTime"
  ) as IUserSubscriptionPlanPrice["planTime"];

  const { subscriptionPlan, subscriptionPlanError, subscriptionPlanLoading } =
    getSubscriptionPlan(subscriptionPlanId);

  if (subscriptionPlanLoading) return <div>loading...</div>;
  if (subscriptionPlanError) return <div>error..</div>;

  const changePlanTime = (planTime: IUserSubscriptionPlanPrice["planTime"]) => {
    setValue("planTime", planTime);
    trigger();
  };

  return (
    <Styled.PlanTimeContainer>
      <h2>Plan: {subscriptionPlan?.name}</h2>
      {subscriptionPlan?.variants.map((variant) => (
        <Styled.PlanLTimeItemWrapper
          onClick={() => changePlanTime(variant.time)}
          key={variant.time}
          selectedTimePlan={variant.time === selectedPlanTime}
        >
          <h3>nazwa: {variant.name}</h3> <h3>cena: {variant.price}</h3>
        </Styled.PlanLTimeItemWrapper>
      ))}
    </Styled.PlanTimeContainer>
  );
};

export default PlanLength;
