import React from "react";
import { getSubscriptionPlans } from "services/getSubscriptionPlans";

//styles
import * as Styled from "./PlanListContainer.styles";

//components
import PlanItem from "../item/PlanListItem";

const PlanListContainer = () => {
  const {
    subscriptionPlans,
    subscriptionPlansError,
    subscriptionPlansLoading,
  } = getSubscriptionPlans();

  if (subscriptionPlansLoading) return <div>loading...</div>;
  if (subscriptionPlansError) return <div>error..</div>;

  return (
    <Styled.PlanListContainer>
      {subscriptionPlans?.map((subscriptionPlan) => (
        <PlanItem
          key={subscriptionPlan._id}
          subscriptionPlan={subscriptionPlan}
        />
      ))}
    </Styled.PlanListContainer>
  );
};

export default PlanListContainer;
