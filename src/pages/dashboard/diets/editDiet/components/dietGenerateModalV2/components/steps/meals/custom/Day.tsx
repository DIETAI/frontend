import React from "react";
import { getDietDay } from "services/getDietDays";
import { getDietDayMeals } from "services/getDietMeals";

//styles
import * as Styled from "./Day.styles";

const Day = ({ dayId }: { dayId: string }) => {
  const { dietDay, dietDayError, dietDayLoading } = getDietDay(dayId);

  if (dietDayLoading) return <div>loading...</div>;
  if (dietDayError) return <div>error...</div>;

  return (
    <Styled.DayWrapper>
      <h2>Dzień: {dietDay?.order}</h2>
      <DayMeals dayId={dayId} />
    </Styled.DayWrapper>
  );
};

const DayMeals = ({ dayId }: { dayId: string }) => {
  const { dietDayMeals, dietDayMealsError, dietDayMealsLoading } =
    getDietDayMeals(dayId);

  if (dietDayMealsLoading) return <div>loading...</div>;
  if (dietDayMealsError) return <div>error...</div>;

  return (
    <ul>
      {dietDayMeals?.map((dayMeal) => (
        <li key={dayMeal._id}>{dayMeal.name}</li>
      ))}
    </ul>
  );
};

export default Day;
