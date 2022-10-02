import React, { useEffect } from "react";
import { useParams } from "react-router";
import ReactLoading from "react-loading";

//form
import { useFormContext } from "react-hook-form";

//query
import { getDietDays } from "services/getDietDays";

//styles
import * as Styled from "./Days.styles";

//icons
import { FaCalendarDay } from "icons/icons";
import { dietGenerateDaysSchema } from "../../../schema/dietGenerate.schema";

// //interfaces
import { IDietGenerateDaysSchema } from "../../../schema/dietGenerate.schema";

//components
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";

const PlanLength = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const { dietEditId } = useParams();
  console.log({ dietEditId });

  if (!dietEditId) return <div>not found</div>;
  const { dietDays, dietDaysError, dietDaysLoading } = getDietDays(dietEditId);

  // const subscriptionPlanId = getValues("subscriptionPlanId") as string;
  const dietGenerateDays = watch("days") as IDietGenerateDaysSchema["days"];

  // const { subscriptionPlan, subscriptionPlanError, subscriptionPlanLoading } =
  //   getSubscriptionPlan(subscriptionPlanId);

  // if (subscriptionPlanLoading) return <div>loading...</div>;
  // if (subscriptionPlanError) return <div>error..</div>;

  const checkAllDays = () => {
    if (dietGenerateDays.length === dietDays?.length) {
      setValue("days", []);
      return trigger();
    }

    setValue(
      "days",
      dietDays?.map((dietDay) => dietDay._id)
    );

    return trigger();
  };

  const changeDays = (dietDayId: string) => {
    if (dietGenerateDays.includes(dietDayId)) {
      setValue(
        "days",
        dietGenerateDays.filter((id) => id !== dietDayId)
      );
      return trigger();
    }
    setValue("days", [...dietGenerateDays, dietDayId]);
    return trigger();
  };

  if (dietDaysLoading)
    return (
      <Styled.LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h2>Pobieranie dni</h2>
      </Styled.LoadingWrapper>
    );
  if (dietDaysError)
    return (
      <Styled.EmptyDataWrapper>
        <h2>
          pobieranie dni nie powiodło się, spróbuj ponownie później wygenerować
          dietę
        </h2>
      </Styled.EmptyDataWrapper>
    );

  return (
    <Styled.DietGenerateDaysContainer>
      <Styled.DaysOptions>
        <CheckBoxWrapper
          onClick={checkAllDays}
          checked={dietGenerateDays.length === dietDays?.length}
        />
        <span>wszystkie dni</span>
      </Styled.DaysOptions>
      <Styled.DaysWrapper>
        {dietDays?.length &&
          dietDays.map((dietDay) => (
            <Styled.DayItem
              key={dietDay._id}
              onClick={() => changeDays(dietDay._id)}
              selectedDay={dietGenerateDays.includes(dietDay._id)}
            >
              <h2>Dzień {dietDay.order}</h2>
              <FaCalendarDay />
            </Styled.DayItem>
          ))}
      </Styled.DaysWrapper>
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
    </Styled.DietGenerateDaysContainer>
  );
};

export default PlanLength;
