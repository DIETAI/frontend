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
import {
  procentClasses,
  percentageRangeClasses,
} from "../../../../utils/procentClasses";

//icons
import { FaEllipsisV } from "icons/icons";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";

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
          establishmentMinGram={establishment.protein.min_gram}
          establishmentMaxGram={establishment.protein.max_gram}
          optionType="percentageRange"
        />
        <SumModal
          macroType="T"
          totalValue={day.total.fat.gram}
          establishmentValue={establishment.fat.gram}
          establishmentMinGram={establishment.fat.min_gram}
          establishmentMaxGram={establishment.fat.max_gram}
          optionType="percentageRange"
        />
        <SumModal
          macroType="W"
          totalValue={day.total.carbohydrates.gram}
          establishmentValue={establishment.carbohydrates.gram}
          establishmentMinGram={establishment.carbohydrates.min_gram}
          establishmentMaxGram={establishment.carbohydrates.max_gram}
          optionType="percentageRange"
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

type ISumModalEstablishmentOption = "perfectProcent" | "percentageRange";

export const SumModal = ({
  totalValue,
  establishmentValue,
  macroType,
  establishmentMinGram,
  establishmentMaxGram,
  optionType,
}: {
  totalValue: number;
  establishmentValue: number;
  macroType: string;
  establishmentMinGram?: number;
  establishmentMaxGram?: number;
  optionType?: ISumModalEstablishmentOption;
}) => {
  const [sumModalOpen, setSumModalOpen] = useState(false);
  const [option, setOption] =
    useState<ISumModalEstablishmentOption>("percentageRange");
  return (
    <Styled.SumItem
      onMouseEnter={() => setSumModalOpen(true)}
      onMouseLeave={() => setSumModalOpen(false)}
      variant={
        optionType === "percentageRange"
          ? percentageRangeClasses({
              value: totalValue,
              minValue: establishmentMinGram || 0,
              maxValue: establishmentMaxGram || 0,
            })
          : procentClasses({
              establishment: establishmentValue,
              total: totalValue,
            })
      }
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
            {!establishmentMinGram && (
              <Styled.PerfectProcent
                variant={procentClasses({
                  establishment: establishmentValue,
                  total: totalValue,
                })}
              >
                <p>
                  <b>{totalValue}</b>/{establishmentValue}
                </p>
              </Styled.PerfectProcent>
            )}

            {establishmentMinGram && (
              <>
                {/* <Styled.SumItemNav>
                  <Styled.SumItemNavOption>
                    <CheckBoxWrapper
                      checked={option === "perfectProcent"}
                      onClick={() => setOption("perfectProcent")}
                    />
                    <p>
                      licz do preferowanej wartości procentowej z odchyleniem 5%
                    </p>
                  </Styled.SumItemNavOption>
                  <Styled.SumItemNavOption>
                    <CheckBoxWrapper
                      checked={option === "percentageRange"}
                      onClick={() => setOption("percentageRange")}
                    />
                    <p>licz do przedziału %</p>
                  </Styled.SumItemNavOption>
                </Styled.SumItemNav> */}
                {option === "percentageRange" && (
                  // <div>
                  //   <p>przedział procentowy: 10-22%</p>
                  //   <p>preferowana wartość %: 15%</p>
                  //   <p>obecna wartość %: 5%</p>
                  // </div>
                  <Styled.PercentageRangeWrapper
                    variant={percentageRangeClasses({
                      value: totalValue,
                      minValue: establishmentMinGram || 0,
                      maxValue: establishmentMaxGram || 0,
                    })}
                  >
                    <Styled.PercentageRangeItem>
                      <p>
                        <b>{totalValue}</b> g
                      </p>
                    </Styled.PercentageRangeItem>
                    <Styled.PercentageRangeItem>
                      <p>
                        /{establishmentMinGram} - {establishmentMaxGram} g
                      </p>
                    </Styled.PercentageRangeItem>
                  </Styled.PercentageRangeWrapper>
                )}

                {option === "perfectProcent" && (
                  <Styled.PerfectProcent
                    variant={procentClasses({
                      establishment: establishmentValue,
                      total: totalValue,
                    })}
                  >
                    <p>
                      <b>{totalValue}</b>/{establishmentValue}
                    </p>
                  </Styled.PerfectProcent>
                )}
              </>
            )}
          </Styled.SumItemModal>
        )}
      </AnimatePresence>
    </Styled.SumItem>
  );
};

export default Day;
