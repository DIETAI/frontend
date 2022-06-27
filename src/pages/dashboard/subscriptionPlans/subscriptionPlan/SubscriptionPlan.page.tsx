import React from "react";
import { useParams } from "react-router";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";
import { Link } from "react-router-dom";

const SubscriptionPlan = () => {
  const { subscriptionPlanId } = useParams();
  console.log({ subscriptionPlanId });

  if (!subscriptionPlanId) return <div>not found</div>;

  const { subscriptionPlan, subscriptionPlanError, subscriptionPlanLoading } =
    getSubscriptionPlan(subscriptionPlanId);

  if (subscriptionPlanLoading) return <div>subscriptionPlan loading...</div>;
  if (subscriptionPlanError || !subscriptionPlan)
    return <div>subscriptionPlan error</div>;
  return (
    <div>
      SubscriptionPlan: {subscriptionPlan.name}{" "}
      <Link
        to={`/dashboard/admin/subscriptionPlans/edit/${subscriptionPlanId}`}
      >
        edit
      </Link>
    </div>
  );
};

export default SubscriptionPlan;
