import React, { useState } from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import { procentClasses } from "pages/dashboard/diets/editDiet/utils/procentClasses";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";

//styles
import * as Styled from "./GeneratedDays.styles";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import { getDietQuery } from "services/getDiets";

const GeneratedDays = () => {
  const { dietEditId } = useParams();
  const { generatedDays } = useSelector(
    (state: RootState) => state.dietGenerate
  );
  console.log({ dietEditId });

  if (!dietEditId) return <div>not found</div>;

  const { dietQuery } = getDietQuery(dietEditId);

  if (!dietQuery) return null;

  return (
    <Styled.DaysContainer>
      {generatedDays.map((day) => (
        <Styled.DayWrapper key={day._id}>
          <Styled.DayHeading>
            <h2>{day.name}</h2>
          </Styled.DayHeading>
          <Styled.DayTotalWrapper>
            <SumModal
              macroType="kcal"
              totalValue={day.total.kcal}
              establishmentValue={dietQuery.establishment.kcal}
            />
            <SumModal
              macroType="B"
              totalValue={day.total.protein.gram}
              establishmentValue={dietQuery.establishment.protein.gram}
            />
            <SumModal
              macroType="T"
              totalValue={day.total.fat.gram}
              establishmentValue={dietQuery.establishment.fat.gram}
            />
            <SumModal
              macroType="W"
              totalValue={day.total.carbohydrates.gram}
              establishmentValue={dietQuery.establishment.carbohydrates.gram}
            />
          </Styled.DayTotalWrapper>

          <div>
            {day.meals.map((meal) => (
              <div key={meal._id}>{meal.name}</div>
            ))}
          </div>
        </Styled.DayWrapper>
      ))}
    </Styled.DaysContainer>
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

export default GeneratedDays;
