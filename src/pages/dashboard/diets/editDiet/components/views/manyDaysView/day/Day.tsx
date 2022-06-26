import React, { useState } from "react";
import { IDietDayQueryData } from "interfaces/diet/dietQuery.interfaces";
import { getDietDayMeals } from "services/getDietMeals";

//components
import Meal from "../meal/Meal";

//styles
import * as Styled from "./Day.styles";

interface IDay {
  day: IDietDayQueryData;
}

const Day = ({ day }: IDay) => {
  // const { dietDayMeals, dietDayMealsError, dietDayMealsLoading } =
  //   getDietDayMeals(day._id);

  // console.log({ dietDayMeals });

  // if (dietDayMealsLoading) return <div>dietDayMeals loading...</div>;
  // if (dietDayMealsError || !dietDayMeals) return <div>dietDayMeals error</div>;

  //query to dayMeals

  //   const {
  //     changeDietGenerateAction,
  //     loading,
  //     dayId,
  //     loadingMsg,
  //     generatedDays,
  //   } = useGenerateDietAction();

  //   const dayLoaded = generatedDays.includes(day.id);

  return (
    <Styled.DayWrapper>
      <h2>Dzień {day.order}</h2>
      {day.meals.length > 0 &&
        day.meals.map((meal) => <Meal key={meal._id} meal={meal} />)}
    </Styled.DayWrapper>

    // <div className="flex flex-col flex-1 border relative p-4 gap-2">
    //   <div className="flex p-4 bg-orange-50 w-full  justify-center items-center">
    //     <h2 className=" text-orange-300 text-base font-medium">
    //       Dzień {day.id}
    //     </h2>
    //   </div>
    //   {currentDayMeals.map((meal) => (
    //     <Meal key={meal.id} meal={meal} />
    //   ))}
    //   {loading && !dayLoaded && (
    //     <div className=" flex items-center justify-center w-full h-full absolute top-0 left-0 backdrop-blur-sm">
    //       <Spinner />
    //     </div>
    //   )}
    // </div>
  );
};

export default Day;
