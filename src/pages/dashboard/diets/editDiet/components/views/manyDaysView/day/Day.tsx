import React, { useState } from "react";
import { IDietDayQueryData } from "interfaces/diet/dietQuery.interfaces";
import { getDietDayMeals } from "services/getDietMeals";
import { AnimatePresence } from "framer-motion";

//components
import Meal from "../meal/Meal";
import IconModal from "components/iconModal/IconModal";
import DayEstablishmentModalContent from "./dayEstablishmentModal/DayEstablishmentModalContent";

//styles
import * as Styled from "./Day.styles";

//utils
import { procentClasses } from "../../../../utils/procentClasses";

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
        <SumModal
          macroType="kcal"
          totalValue={day.total.kcal}
          establishmentValue={establishment.kcal}
        />
        <SumModal
          macroType="B"
          totalValue={day.total.protein.gram}
          establishmentValue={establishment.protein.gram}
        />
        <SumModal
          macroType="T"
          totalValue={day.total.fat.gram}
          establishmentValue={establishment.fat.gram}
        />
        <SumModal
          macroType="W"
          totalValue={day.total.carbohydrates.gram}
          establishmentValue={establishment.carbohydrates.gram}
        />
      </Styled.DayTotalWrapper>
      <Styled.DayMealsWrapper>
        {day.meals.length > 0 &&
          day.meals.map((meal) => (
            <Meal key={meal._id} meal={meal} establishment={establishment} />
          ))}
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

export const SumModal = ({
  totalValue,
  establishmentValue,
  macroType,
}: {
  totalValue: number;
  establishmentValue: number;
  macroType: string;
}) => {
  const [sumModalOpen, setSumModalOpen] = useState(false);
  return (
    <Styled.SumItem
      onMouseEnter={() => setSumModalOpen(true)}
      onMouseLeave={() => setSumModalOpen(false)}
      variant={procentClasses({
        establishment: establishmentValue,
        total: totalValue,
      })}
    >
      <p>
        {macroType}: <b>{totalValue}</b>
      </p>

      <AnimatePresence>
        {sumModalOpen && (
          <Styled.SumItemModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>
              <b>{totalValue}</b>/{establishmentValue}
            </p>
          </Styled.SumItemModal>
        )}
      </AnimatePresence>
    </Styled.SumItem>
  );
};

export default Day;
