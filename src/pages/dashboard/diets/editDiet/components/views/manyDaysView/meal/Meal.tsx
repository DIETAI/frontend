import React, { useState } from "react";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./Meal.styles";

//components
import Modal from "components/modal/Modal";
import AddDinnerModalContent from "./addDinnerModal/AddDinnerModal";
import IconModal from "components/iconModal/IconModal";
import MealEstablishmentModalContent from "./mealEstablishmentModal/MealEstablishmentModalContent";
import Dinner from "../dinner/Dinner";

//icons
import { FaEllipsisV, FaPlus } from "icons/icons";

interface IMeal {
  meal: IDietMealQueryData;
}

const Meal = ({ meal }: IMeal) => {
  const [addDinnerModalOpen, setDinnerModalOpen] = useState(false);

  // const { dietDinners, dietDinnersError, dietDinnersLoading } = getDietDinners(
  //   meal._id
  // );

  return (
    <Styled.MealWrapper>
      <Styled.MealHeading>
        <h3>{meal.name}</h3>
        <h3>8.00</h3>
        {/* <IconModal icon={<FaEllipsisV />}>
          <MealEstablishmentModalContent />
        </IconModal> */}
      </Styled.MealHeading>

      {meal.total && (
        <div>
          <p>kcal: {meal.total?.kcal}</p>
          <p>B (g): {meal.total?.protein.gram}</p>
          <p>T (g): {meal.total?.fat.gram}</p>
          <p>W (g): {meal.total?.carbohydrates.gram}</p>
        </div>
      )}

      {meal.dinners?.map((dietDinner) => (
        <Dinner key={dietDinner._id} dietDinner={dietDinner} />
      ))}
      <Styled.AddDinnerButton onClick={() => setDinnerModalOpen(true)}>
        <FaPlus />
        dodaj pozycję
      </Styled.AddDinnerButton>

      <Modal
        onClose={() => setDinnerModalOpen(false)}
        open={addDinnerModalOpen}
      >
        <AddDinnerModalContent
          meal={meal}
          closeModal={() => setDinnerModalOpen(false)}
        />
      </Modal>
    </Styled.MealWrapper>
  );
};

export default Meal;
