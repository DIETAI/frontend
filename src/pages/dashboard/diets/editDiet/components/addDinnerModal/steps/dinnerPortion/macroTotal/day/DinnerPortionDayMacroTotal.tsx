import React, { useState } from "react";
import * as Styled from "../DinnerPortionMacroTotal.styles";
import { useFormContext } from "react-hook-form";
import { getDietDay } from "services/getDietDays";
import { useDietEstablishment } from "services/useDietEstablishments";
import { getDiet } from "services/getDiets";

import { SumModal } from "../sumModal/SumModal";

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

  const dayId = watch("dayId") as string;
  const dietId = watch("dietId") as string;

  const { diet } = getDiet(dietId);

  if (!diet) return null;

  const { dietDay } = getDietDay(dayId);
  const { dietEstablishment: establishment } = useDietEstablishment(
    diet.establishmentId
  );

  if (!dietDay || !establishment) return null;

  return (
    <Styled.TotalContainer>
      <Styled.TotalHeadingWrapper>
        <h2>Dzień</h2>
      </Styled.TotalHeadingWrapper>

      <Styled.TotalWrapper>
        <h3>Razem:</h3>

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
      </Styled.TotalWrapper>
    </Styled.TotalContainer>
  );
};

export default DinnerPortionMacroTotal;
