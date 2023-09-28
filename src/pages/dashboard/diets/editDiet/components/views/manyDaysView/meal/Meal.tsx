import React, { useEffect, useState } from "react";
import axios from "utils/api";
import { mutate } from "swr";
import { useParams } from "react-router";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//interfaces
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

//react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//styles
import * as Styled from "./Meal.styles";

//components
import Modal from "components/modal/Modal";
import AddDinnerModalContent from "../../../addDinnerModal/AddDinnerModal";
import Dinner from "../dinner/Dinner";
import { SumModal } from "../day/Day";
import MealGenerateModalContent from "../../../mealGenerateModal/MealGenerateModal";

//icons
import { FaPlus, FaFileAlt } from "icons/icons";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import {
  IDietMealPopulateData,
  IDietPopulateData,
} from "interfaces/diet/dietPopulate.interfaces";
import { getDietPopulate } from "services/getDiets";
import { round2 } from "helpers/round2";

interface IMeal {
  meal: IDietMealPopulateData;
  establishment: IDietPopulateData["establishmentId"];
}

const Meal = ({ meal, establishment }: IMeal) => {
  const { handleAlert } = useAlert();
  const { dietEditId } = useParams();
  const [addDinnerModalOpen, setDinnerModalOpen] = useState(false);
  const [generateMealModalOpen, setGenerateMealModalOpen] = useState(false);
  const [mealDinners, setMealDinners] = useState(meal.dietDinners);

  useEffect(() => {
    setMealDinners(meal.dietDinners);
  }, [meal]);

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

    const newDietDinnersOrder = await Promise.all(
      newMealDinners.map(async (mealDinner, mealDinnerIndex) => {
        //zmiana dinner order -> correct
        const newMealDinner = {
          ...mealDinner,
          dietId: dietEditId,
          dinnerPortionId: mealDinner.dinnerPortionId._id,
          order: mealDinnerIndex + 1,
        };

        try {
          const editDietDinner = await axios.put(
            `/api/v1/dietDinners/${newMealDinner._id}`,
            newMealDinner,
            {
              withCredentials: true,
            }
          );

          console.log({ newMealDinner, editDietDinner });
        } catch (e) {
          handleAlert(
            "error",
            "Wystąpił błąd podczas zmiany kolejności potraw w posiłku"
          );
          console.log(e);
        }
      })
    );

    //mutate dietquery obj
    handleAlert("success", "Zmieniono kolejność potraw w posiłku");
    await mutate(`/api/v1/diets/${dietEditId}/populate`); //correct
  };

  return (
    <Styled.MealWrapper>
      <Styled.MealHeading>
        <h3>{meal.name}</h3>
        <h3>{mealEstablishment.time}</h3>
      </Styled.MealHeading>
      {/* {meal._id} */}
      {/* {meal.establishmentMealId} */}
      <Styled.MealTotalWrapper>
        <SumModal
          macroType="kcal"
          totalValue={meal.total.kcal}
          establishmentValue={mealEstablishment?.kcal as number}
        />

        <p>
          B: <b>{round2(meal.total?.protein.gram)}</b>{" "}
        </p>
        <p>
          T: <b>{round2(meal.total?.fat.gram)}</b>{" "}
        </p>
        <p>
          W: <b>{round2(meal.total?.carbohydrates.gram)}</b>{" "}
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

      <Styled.AddDinnerButton onClick={() => setDinnerModalOpen(true)}>
        <FaPlus />
        dodaj pozycję
      </Styled.AddDinnerButton>

      <Styled.AddDinnerButton onClick={() => setGenerateMealModalOpen(true)}>
        <FaFileAlt />
        generuj posiłek
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
      <Modal open={generateMealModalOpen}>
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
