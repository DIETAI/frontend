import React from "react";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";
import { useFormContext } from "react-hook-form";

//interfaces
import { IUserSubscriptionPlanPrice } from "../../schema/userSubscriptionPlan.schema";

const Checkout = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const subscriptionPlanId = getValues("subscriptionPlanId") as string;
  const selectedPlanTime = getValues(
    "planTime"
  ) as IUserSubscriptionPlanPrice["planTime"];

  const { subscriptionPlan, subscriptionPlanError, subscriptionPlanLoading } =
    getSubscriptionPlan(subscriptionPlanId);

  if (subscriptionPlanLoading) return <div>loading...</div>;
  if (subscriptionPlanError) return <div>error..</div>;

  const selectedVariant = subscriptionPlan?.variants.find(
    ({ time }) => time === selectedPlanTime
  );

  return (
    <div>
      <h2>plan: {subscriptionPlan?.name}</h2>{" "}
      <h2>czas: {selectedVariant?.name}</h2>{" "}
      <h2>cena: {selectedVariant?.price}</h2>{" "}
    </div>
  );
};

export default Checkout;
