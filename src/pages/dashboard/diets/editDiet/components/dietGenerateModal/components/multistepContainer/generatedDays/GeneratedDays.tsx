import React from "react";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";

//styles
import * as Styled from "./GeneratedDays.styles";

const GeneratedDays = () => {
  const { generatedDays } = useSelector(
    (state: RootState) => state.dietGenerate
  );

  return (
    <Styled.DaysContainer>
      {generatedDays.map((day) => (
        <Styled.DayWrapper key={day._id}>
          <Styled.DayHeading>
            <h2>{day.name}</h2>
          </Styled.DayHeading>
          {/* <Styled.DayTotalWrapper>
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
          </Styled.DayTotalWrapper> */}

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

export default GeneratedDays;
