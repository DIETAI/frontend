import React, { useState } from "react";
import { IDietDayQueryData } from "interfaces/diet/dietQuery.interfaces";
import { getDietDayMeals } from "services/getDietMeals";

//components
import Meal from "../meal/Meal";
import IconModal from "components/iconModal/IconModal";
import DayEstablishmentModalContent from "./dayEstablishmentModal/DayEstablishmentModalContent";

//styles
import * as Styled from "./Day.styles";

//icons
import { FaEllipsisV } from "icons/icons";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

interface IDay {
  day: IDietDayQueryData;
  establishment: IDietEstablishmentData;
}

const Day = ({ day, establishment }: IDay) => {
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
      <Styled.DayHeading>
        <h2>Dzień {day.order}</h2>
        {/* <IconModal icon={<FaEllipsisV />}>
          <DayEstablishmentModalContent />
        </IconModal> */}
      </Styled.DayHeading>
      {/* <Styled.DayTotal>
        <Styled.DayTotalItem>
          <span>B (g)</span>
          <p>
            <b>{day.total.protein.gram}</b>/{establishment.protein.gram}
          </p>
        </Styled.DayTotalItem>
        <Styled.DayTotalItem>
          <span>T (g)</span>
          <p>
            <b>{day.total.fat.gram}</b>/{establishment.fat.gram}
          </p>
        </Styled.DayTotalItem>
        <Styled.DayTotalItem>
          <span>W (g)</span>
          <p>
            <b>{day.total.carbohydrates.gram}</b>/
            {establishment.carbohydrates.gram}
          </p>
        </Styled.DayTotalItem>
        <Styled.DayTotalItem>
          <span>Kcal</span>
          <p>
            <b>{day.total.kcal}</b>/{establishment.kcal}
          </p>
        </Styled.DayTotalItem>
      </Styled.DayTotal> */}
      <Styled.DayTotalWrapper>
        <p>
          kcal: <b>{day.total?.kcal}</b>
        </p>
        <p>
          B: <b>{day.total?.protein.gram}</b>{" "}
        </p>
        <p>
          T: <b>{day.total?.fat.gram}</b>{" "}
        </p>
        <p>
          W: <b>{day.total?.carbohydrates.gram}</b>{" "}
        </p>
      </Styled.DayTotalWrapper>
      <Styled.DayMealsWrapper>
        {day.meals.length > 0 &&
          day.meals.map((meal) => <Meal key={meal._id} meal={meal} />)}
      </Styled.DayMealsWrapper>
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
