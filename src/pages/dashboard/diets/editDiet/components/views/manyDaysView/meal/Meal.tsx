import React, { useState } from "react";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./Meal.styles";

//components
import Modal from "components/modal/Modal";
import AddDinnerModalContent from "../../../addDinnerModal/AddDinnerModal";
import IconModal from "components/iconModal/IconModal";
import MealEstablishmentModalContent from "./mealEstablishmentModal/MealEstablishmentModalContent";
import Dinner from "../dinner/Dinner";
import { SumModal } from "../day/Day";
import MealGenerateModalContent from "../../../mealGenerateModal/MealGenerateModal";

//icons
import { FaEllipsisV, FaPlus, FaFileAlt } from "icons/icons";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

interface IMeal {
  meal: IDietMealQueryData;
  establishment: IDietEstablishmentData;
}

const Meal = ({ meal, establishment }: IMeal) => {
  const [addDinnerModalOpen, setDinnerModalOpen] = useState(false);
  const [generateMealModalOpen, setGenerateMealModalOpen] = useState(false);

  // const { dietDinners, dietDinnersError, dietDinnersLoading } = getDietDinners(
  //   meal._id
  // );
  const mealEstablishment = establishment.meals.find(
    ({ _id }) => _id === meal.establishmentMealId
  );

  if (!mealEstablishment) return null;

  return (
    <Styled.MealWrapper>
      <Styled.MealHeading>
        <h3>{meal.name}</h3>
        <h3>8.00</h3>
        {/* <IconModal icon={<FaEllipsisV />}>
          <MealEstablishmentModalContent />
        </IconModal> */}
      </Styled.MealHeading>

      <Styled.MealTotalWrapper>
        <SumModal
          macroType="kcal"
          totalValue={meal.total.kcal}
          establishmentValue={mealEstablishment?.kcal as number}
        />
        {/* <p>
          kcal: <b>{meal.total?.kcal}</b>
        </p> */}
        <p>
          B: <b>{meal.total?.protein.gram}</b>{" "}
        </p>
        <p>
          T: <b>{meal.total?.fat.gram}</b>{" "}
        </p>
        <p>
          W: <b>{meal.total?.carbohydrates.gram}</b>{" "}
        </p>
      </Styled.MealTotalWrapper>

      {meal.dinners?.map((dietDinner) => (
        <Dinner key={dietDinner._id} dietDinner={dietDinner} />
      ))}
      <Styled.AddDinnerButton onClick={() => setDinnerModalOpen(true)}>
        <FaPlus />
        dodaj pozycję
      </Styled.AddDinnerButton>
      {meal.dinners.length < 1 && (
        <Styled.AddDinnerButton onClick={() => setGenerateMealModalOpen(true)}>
          <FaFileAlt />
          szybkie generowanie
        </Styled.AddDinnerButton>
      )}

      <Modal
        onClose={() => setDinnerModalOpen(false)}
        open={addDinnerModalOpen}
      >
        <AddDinnerModalContent
          meal={meal}
          closeModal={() => setDinnerModalOpen(false)}
        />
      </Modal>
      <Modal
        // onClose={() => setGenerateMealModalOpen(false)}
        open={generateMealModalOpen}
      >
        <MealGenerateModalContent
          meal={meal}
          mealEstablishment={mealEstablishment}
          dietEstablishment={establishment}
          closeModal={() => setGenerateMealModalOpen(false)}
        />
      </Modal>
    </Styled.MealWrapper>
  );
};

export default Meal;
