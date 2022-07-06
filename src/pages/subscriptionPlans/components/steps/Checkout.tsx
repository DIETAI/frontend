import React from "react";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";
import { useFormContext } from "react-hook-form";

//interfaces
import {
  IUserSubscriptionPlanPrice,
  IUserSubscriptionPlanCheckout,
} from "../../schema/userSubscriptionPlan.schema";

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
    "stripePriceId"
  ) as IUserSubscriptionPlanPrice["stripePriceId"];

  const selectedPaymentOperator = watch(
    "paymentOperator"
  ) as IUserSubscriptionPlanCheckout["paymentOperator"];

  const { subscriptionPlan, subscriptionPlanError, subscriptionPlanLoading } =
    getSubscriptionPlan(subscriptionPlanId);

  if (subscriptionPlanLoading) return <div>loading...</div>;
  if (subscriptionPlanError) return <div>error..</div>;

  const selectedVariant = subscriptionPlan?.variants.find(
    ({ stripePriceId }) => stripePriceId === selectedPlanTime
  );
  return (
    <div>
      <h2>plan: {subscriptionPlan?.name}</h2>{" "}
      <h2>czas: {selectedVariant?.name}</h2>{" "}
      <h2>cena: {selectedVariant?.price}</h2>{" "}
      <h2>operator płatności: {selectedPaymentOperator}</h2>
    </div>
  );
};

export default Checkout;
