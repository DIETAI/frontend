import React, { useState } from "react";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import axios from "utils/api";
import { mutate } from "swr";

//react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [mealDinners, setMealDinners] = useState(meal.dinners);

  // const { dietDinners, dietDinnersError, dietDinnersLoading } = getDietDinners(
  //   meal._id
  // );
  const mealEstablishment = establishment.meals.find(
    ({ _id }) => _id === meal.establishmentMealId
  );

  if (!mealEstablishment) return null;

  const handleOnDragDinnersEnd = async (result: any) => {
    console.log(result);
    if (!result.destination) return;

    const newMealDinners = Array.from(mealDinners);
    const [reorderedItem] = newMealDinners.splice(result.source.index, 1);
    newMealDinners.splice(result.destination.index, 0, reorderedItem);

    setMealDinners(newMealDinners);

    //edit dietDinnersOrder == dinnerIndex + 1

    const newDietDinnersOrder = await Promise.all(
      newMealDinners.map(async (mealDinner, mealDinnerIndex) => {
        const newMealDinner = { ...mealDinner, order: mealDinnerIndex + 1 };
        try {
          const editDietDinner = await axios.put(
            `/api/v1/dietDinners/${newMealDinner._id}`,
            newMealDinner,
            {
              withCredentials: true,
            }
          );

          console.log({ newMealDinner, editDietDinner });

          //mutate dietquery obj
          await mutate(`/api/v1/diets/${mealDinner.dietId}/query`); //correct
        } catch (e) {
          console.log(e);
        }
      })
    );
  };

  return (
    <Styled.MealWrapper>
      <Styled.MealHeading>
        <h3>{meal.name}</h3>
        <h3>{mealEstablishment.time}</h3>

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

      <DragDropContext onDragEnd={handleOnDragDinnersEnd}>
        <Droppable droppableId="dinnersOrder">
          {(provided) => (
            <Styled.MealDinnersList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {mealDinners.map((dietDinner, index) => (
                <Draggable
                  key={dietDinner._id}
                  draggableId={dietDinner._id}
                  index={index}
                >
                  {(provided) => (
                    <Dinner provided={provided} dietDinner={dietDinner} />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Styled.MealDinnersList>
          )}
        </Droppable>
      </DragDropContext>

      {/* {sortedMealDinners.map((dietDinner) => (
        <Dinner key={dietDinner._id} dietDinner={dietDinner} />
      ))} */}
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
        // onClose={() => setDinnerModalOpen(false)}
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
