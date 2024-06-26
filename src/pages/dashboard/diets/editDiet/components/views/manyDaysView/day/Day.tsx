import React, { useState } from "react";

//animations
import { AnimatePresence } from "framer-motion";

//queries
import { IDietDayQueryData } from "interfaces/diet/dietQuery.interfaces";

//utils
import { dateFormat } from "../../../../utils/dayDateFormat";

//components
import Meal from "../meal/Meal";

//styles
import * as Styled from "./Day.styles";

//utils
import {
  procentClasses,
  percentageRangeClasses,
} from "../../../../utils/procentClasses";

//icons
import { FaCalendar } from "icons/icons";

//interfaces
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import {
  IDietDayPopulateData,
  IDietPopulateData,
} from "interfaces/diet/dietPopulate.interfaces";

import { round2 } from "helpers/round2";
import { roundValue } from "../../../dietGenerateModal/helpers/generateDiet";

interface IDay {
  day: IDietDayPopulateData;
  establishment: IDietPopulateData["establishmentId"];
}

const Day = ({ day, establishment }: IDay) => {
  return (
    <Styled.DayWrapper>
      <Styled.DayHeading>
        <FaCalendar />
        <h2>{day.date ? dateFormat(day.date) : `Dzień ${day.order}`}</h2>
      </Styled.DayHeading>
      <Styled.DayTotalWrapper>
        {/* {day._id} */}
        {/* {day.establishmentId} */}
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
        {day.dietMeals.length > 0 &&
          day.dietMeals.map((meal) => (
            <Meal key={meal._id} meal={meal} establishment={establishment} />
          ))}
      </Styled.DayMealsWrapper>
    </Styled.DayWrapper>
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
        {macroType}: <b>{round2(totalValue)}</b>
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
                  <b>{round2(totalValue)}</b>/{round2(establishmentValue)}
                </p>
              </Styled.PerfectProcent>
            )}

            {establishmentMinGram && (
              <>
                {option === "percentageRange" && (
                  <Styled.PercentageRangeWrapper
                    variant={percentageRangeClasses({
                      value: totalValue,
                      minValue: establishmentMinGram || 0,
                      maxValue: establishmentMaxGram || 0,
                    })}
                  >
                    <Styled.PercentageRangeItem>
                      <p>
                        <b>{roundValue(totalValue)}</b> g
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
                      <b>{roundValue(totalValue)}</b>/
                      {roundValue(establishmentValue)}
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
