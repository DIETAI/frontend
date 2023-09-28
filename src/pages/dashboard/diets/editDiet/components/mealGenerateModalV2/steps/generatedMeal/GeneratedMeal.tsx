import React from "react";

//components
import Button from "components/form/button/Button";

//styles
import * as Styled from "./GeneratedMeal.styles";

const GeneratedMeal = ({
  mealName,
  closeModal,
  generateMeal,
  addMealToDiet,
}: {
  mealName: string;
  closeModal: () => void;
  generateMeal: () => void;
  addMealToDiet: () => void;
}) => {
  const generatedMeal = {};
  return (
    <>
      <Styled.GeneratedMealNavWrapper>
        <h3>{mealName}</h3>
        <Styled.GeneratedMealNavButtonsWrapper>
          <Button type="button" onClick={generateMeal} variant="secondary">
            generuj ponownie posiłek
          </Button>
          <Button type="button" onClick={addMealToDiet}>
            dodaj posiłek do diety
          </Button>
          <Button type="button" onClick={closeModal} variant="secondary">
            anuluj
          </Button>
        </Styled.GeneratedMealNavButtonsWrapper>
      </Styled.GeneratedMealNavWrapper>

      {/* <Styled.OneDayViewTotalWrapper>
        <TotalItem
          macroType="B (g)"
          variant={percentageRangeClasses({
            minValue: dietEstablishment.protein.min_procent,
            maxValue: dietEstablishment.protein.max_procent,
            value:
              selectedMealGroup?.macroTotalCount.total_protein_procent ||
              0,
          })}
          macroProcent={
            selectedMealGroup?.macroTotalCount.total_protein_procent
          }
          totalValue={
            selectedMealGroup?.macroTotalCount.total_protein_gram
          }
          modalContent={`${dietEstablishment.protein.min_procent} - ${dietEstablishment.protein.max_procent} %`}
        />

        <TotalItem
          macroType="T (g)"
          variant={percentageRangeClasses({
            minValue: dietEstablishment.fat.min_procent,
            maxValue: dietEstablishment.fat.max_procent,
            value:
              selectedMealGroup?.macroTotalCount.total_fat_procent || 0,
          })}
          macroProcent={
            selectedMealGroup?.macroTotalCount.total_fat_procent
          }
          totalValue={selectedMealGroup?.macroTotalCount.total_fat_gram}
          modalContent={`${dietEstablishment.fat.min_procent} - ${dietEstablishment.fat.max_procent} %`}
        />

        <TotalItem
          macroType="W (g)"
          variant={percentageRangeClasses({
            minValue: dietEstablishment.carbohydrates.min_procent,
            maxValue: dietEstablishment.carbohydrates.max_procent,
            value:
              selectedMealGroup?.macroTotalCount
                .total_carbohydrates_procent || 0,
          })}
          macroProcent={
            selectedMealGroup?.macroTotalCount.total_carbohydrates_procent
          }
          totalValue={
            selectedMealGroup?.macroTotalCount.total_carbohydrates_gram
          }
          modalContent={`${dietEstablishment.carbohydrates.min_procent} - ${dietEstablishment.carbohydrates.max_procent} %`}
        />

        <Styled.OneDayViewTotalItem
          variant={procentClasses({
            establishment: mealEstablishment.kcal,
            total: selectedMealGroup?.macroTotalCount.total_kcal || 0,
          })}
        >
          <h2>Kcal:</h2>
          <p>
            <b>{selectedMealGroup?.macroTotalCount.total_kcal}</b>/
            {mealEstablishment.kcal}
          </p>
        </Styled.OneDayViewTotalItem>
      </Styled.OneDayViewTotalWrapper> */}

      {/* <Styled.SelectedGroupInfo>
        <p>wybrana grupa na podstawie: </p>
        <h3> {generatedMeal?.description}</h3>
      </Styled.SelectedGroupInfo> */}

      {/* <Styled.PortionsWrapper>
        {mealDinners.map((mealDinner, dinnerIndex) => (
          <DinnerPortion
            key={mealDinner.dinnerId}
            mealDinner={mealDinner}
            dinnerIndex={dinnerIndex}
          />
        ))}
      </Styled.PortionsWrapper> */}
    </>
  );
};

export default GeneratedMeal;
