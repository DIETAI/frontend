import React, { useState, useEffect } from "react";
import * as Styled from "../DinnerPortionMacroTotal.styles";
import { useFormContext } from "react-hook-form";
import { getDietDay } from "services/getDietDays";
import { getDietEstablishment } from "services/getDietEstablishments";
import { getDiet } from "services/getDiets";
import { getDinnerPortion } from "services/getDinnerPortions";

import { SumModal } from "../sumModal/SumModal";

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

const DinnerPortionMacroTotal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const [dayTotalAfterAddedPortion, setDayTotalAfterAddedPortion] =
    useState<any>();

  const dayId = watch("dayId") as string;
  const dietId = watch("dietId") as string;
  const selectedDinnerPortionId = watch("dinnerPortionId") as string;

  const { dinnerPortion } = getDinnerPortion(selectedDinnerPortionId);

  const { diet } = getDiet(dietId);

  if (!diet) return null;

  const { dietDay } = getDietDay(dayId);
  const { dietEstablishment: establishment } = getDietEstablishment(
    diet.establishmentId
  );

  useEffect(() => {
    if (dinnerPortion && dietDay) {
      const kcal = roundValue(dinnerPortion.total.kcal + dietDay.total.kcal);
      const proteinGram = roundValue(
        dinnerPortion.total.protein.gram + dietDay.total.protein.gram
      );
      const fatGram = roundValue(
        dinnerPortion.total.fat.gram + dietDay.total.fat.gram
      );
      const carbohydratesGram = roundValue(
        dinnerPortion.total.carbohydrates.gram +
          dietDay.total.carbohydrates.gram
      );

      setDayTotalAfterAddedPortion({
        kcal,
        proteinGram,
        fatGram,
        carbohydratesGram,
      });
    }
  }, [dinnerPortion, dietDay]);

  if (!dietDay || !establishment) return null;

  return (
    <Styled.TotalContainer>
      <Styled.TotalHeadingWrapper>
        <h2>Dzień</h2>
      </Styled.TotalHeadingWrapper>

      <Styled.TotalWrapper>
        <h3>Obecnie:</h3>

        <Styled.TotalMacroItemsWrapper>
          <SumModal
            macroType="kcal"
            totalValue={dietDay.total.kcal}
            establishmentValue={establishment.kcal}
          />
          <SumModal
            macroType="B"
            totalValue={dietDay.total.protein.gram}
            establishmentValue={establishment.protein.gram}
            establishmentMinGram={establishment.protein.min_gram}
            establishmentMaxGram={establishment.protein.max_gram}
            optionType="percentageRange"
          />
          <SumModal
            macroType="T"
            totalValue={dietDay.total.fat.gram}
            establishmentValue={establishment.fat.gram}
            establishmentMinGram={establishment.fat.min_gram}
            establishmentMaxGram={establishment.fat.max_gram}
            optionType="percentageRange"
          />
          <SumModal
            macroType="W"
            totalValue={dietDay.total.carbohydrates.gram}
            establishmentValue={establishment.carbohydrates.gram}
            establishmentMinGram={establishment.carbohydrates.min_gram}
            establishmentMaxGram={establishment.carbohydrates.max_gram}
            optionType="percentageRange"
          />
        </Styled.TotalMacroItemsWrapper>
        <h3>Po dodaniu porcji:</h3>
        <Styled.TotalMacroItemsWrapper>
          <SumModal
            macroType="kcal"
            totalValue={dayTotalAfterAddedPortion?.kcal || dietDay.total.kcal}
            establishmentValue={establishment.kcal}
          />
          <SumModal
            macroType="B"
            totalValue={
              dayTotalAfterAddedPortion?.proteinGram ||
              dietDay.total.protein.gram
            }
            establishmentValue={establishment.protein.gram}
            establishmentMinGram={establishment.protein.min_gram}
            establishmentMaxGram={establishment.protein.max_gram}
            optionType="percentageRange"
          />
          <SumModal
            macroType="T"
            totalValue={
              dayTotalAfterAddedPortion?.fatGram || dietDay.total.fat.gram
            }
            establishmentValue={establishment.fat.gram}
            establishmentMinGram={establishment.fat.min_gram}
            establishmentMaxGram={establishment.fat.max_gram}
            optionType="percentageRange"
          />
          <SumModal
            macroType="W"
            totalValue={
              dayTotalAfterAddedPortion?.carbohydratesGram ||
              dietDay.total.carbohydrates.gram
            }
            establishmentValue={establishment.carbohydrates.gram}
            establishmentMinGram={establishment.carbohydrates.min_gram}
            establishmentMaxGram={establishment.carbohydrates.max_gram}
            optionType="percentageRange"
          />
        </Styled.TotalMacroItemsWrapper>
      </Styled.TotalWrapper>
    </Styled.TotalContainer>
  );
};

export default DinnerPortionMacroTotal;
