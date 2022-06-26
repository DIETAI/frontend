import React, { useState } from "react";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./Meal.styles";

//components
import Modal from "components/modal/Modal";
import AddDinnerModalContent from "./addDinnerModal/AddDinnerModal";
import { getDietDinners } from "services/getDietDinners";

interface IMeal {
  meal: IDietMealQueryData;
}

const Meal = ({ meal }: IMeal) => {
  const [addDinnerModalOpen, setDinnerModalOpen] = useState(false);

  // const { dietDinners, dietDinnersError, dietDinnersLoading } = getDietDinners(
  //   meal._id
  // );

  return (
    <Styled.MealWrapper className="w-full flex flex-col gap-6">
      <div className="flex p-4 bg-slate-50 w-full justify-center items-center">
        <button onClick={() => setDinnerModalOpen(true)}>+</button>
        {meal.name}
        {meal.dinners?.map((dietDinner) => (
          <div key={dietDinner._id}>{dietDinner.dinner.name}</div>
        ))}
        {/* <h3 className=" text-slate-700 text-base font-medium">{meal.name}</h3> */}
      </div>
      {/* {currentMealDinners.map((dinner) => (
        <div className="flex p-4 rounded-md bg-white shadow-sm" key={dinner.id}>
          {dinner.name}
        </div>
      ))} */}
      {/* <button
        onClick={() => setMealPopupOpen(meal.id, true)}
        className=" text-orange-300 text-sm font-medium flex items-center justify-center p-4 border-2 border-orange-200 border-dashed"
      >
        Dodaj posiłek
      </button> */}

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
