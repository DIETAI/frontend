import React from "react";
import { useParams } from "react-router";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";

//components
import EditSubscriptionPlanForm from "../components/EditSubscriptionPlanForm";

const EditSubscriptionPlan = () => {
  const { subscriptionPlanId } = useParams();
  console.log({ subscriptionPlanId });

  if (!subscriptionPlanId) return <div>not found</div>;

  const { subscriptionPlan, subscriptionPlanError, subscriptionPlanLoading } =
    getSubscriptionPlan(subscriptionPlanId);

  if (subscriptionPlanLoading) return <div>subscriptionPlan loading...</div>;
  if (subscriptionPlanError || !subscriptionPlan)
    return <div>subscriptionPlan error</div>;

  return <EditSubscriptionPlanForm subscriptionPlan={subscriptionPlan} />;
};

export default EditSubscriptionPlan;
