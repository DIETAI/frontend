import React from "react";
import { ISubscriptionPlanData } from "interfaces/subscriptionPlan.interfaces";

//form
import { useFormContext } from "react-hook-form";

//styles
import * as Styled from "./PlanListItem.styles";

interface IPlanItemProps {
  subscriptionPlan: ISubscriptionPlanData;
}

const PlanItem = ({ subscriptionPlan }: IPlanItemProps) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const selectedPlan = watch("subscriptionPlanId") as string;

  const changePlan = () => {
    setValue("subscriptionPlanId", subscriptionPlan._id);
    trigger();
  };

  return (
    <Styled.PlanListItemWrapper
      onClick={changePlan}
      selectedPlan={selectedPlan === subscriptionPlan._id}
    >
      <h2>nazwa: {subscriptionPlan.name}</h2>
      <h3>cena: {subscriptionPlan.price} zł</h3>
    </Styled.PlanListItemWrapper>
  );
};

export default PlanItem;
