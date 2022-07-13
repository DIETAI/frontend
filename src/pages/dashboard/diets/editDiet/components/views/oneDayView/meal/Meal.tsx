import { IDietDayMealData } from "interfaces/diet/dietMeals.interfaces";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import React, { useState } from "react";
// import { columns } from "../OneDayView";

//interfaces
// import { DietDays } from "../../../../../helpers/createDays";

//popup
// import PopupContainer from "@/components/popup/PopupContainer";

//context
// import ModalContainer from "@/components/modal/Modal";
// import { useCurrentMeal } from "../../../../context/currentMeal.context";

//form
import { useFormContext } from "react-hook-form";

//icons
import { FaPlus } from "icons/icons";

//styles
import * as Styled from "./Meal.styles";

//components
import Modal from "components/modal/Modal";
import AddDinnerModalContent from "../../../addDinnerModal/AddDinnerModal";
import Image from "components/form/images/image/Image";

const Meal = ({ meal }: { meal: IDietMealQueryData }) => {
  const [addDinnerModalOpen, setDinnerModalOpen] = useState(false);
  // const { mealId, mealPopupOpen, setMealPopupOpen } = useCurrentMeal();

  // const currentMealDinners = dietDinners.filter(
  //   ({ mealId }) => mealId === meal.id
  // );

  return (
    <>
      <Styled.MealWrapper className="w-fit flex flex-col 2xl:w-full">
        <Styled.Meal className="w-fit flex border-x border-b  2xl:w-full">
          <Styled.MealNameWrapper className="w-40 border-r p-5 2xl:flex-auto relative">
            {meal.name}
            <Styled.AddDinnerButtonWrapper
              onClick={() => setDinnerModalOpen(true)}
            >
              <FaPlus />
              dodaj pozycję
            </Styled.AddDinnerButtonWrapper>
          </Styled.MealNameWrapper>
          <Styled.MealDinnersWrapper className="flex flex-col divide-y">
            {meal.dinners.length < 1 && (
              <Styled.EmptyMealWrapper>
                <Styled.EmptyMealContent
                  onClick={() => setDinnerModalOpen(true)}
                >
                  <FaPlus />
                </Styled.EmptyMealContent>
              </Styled.EmptyMealWrapper>
            )}
            {meal.dinners.length > 0 &&
              meal.dinners.map((dinner, index) => (
                <>
                  <Styled.DinnerWrapper key={dinner._id} className="flex">
                    <Styled.DinnerNameWrapper
                      style={{ width: "26rem" }}
                      className="w-40 p-5 border-r 2xl:w-64"
                    >
                      <span>
                        {dinner.dinnerPortion.dinner.image && (
                          <Image
                            roundedDataGrid={true}
                            imageId={dinner.dinnerPortion.dinner.image}
                          />
                        )}
                        {dinner.dinnerPortion.dinner.name}
                      </span>
                    </Styled.DinnerNameWrapper>

                    <Styled.DinnerProductsWrapper>
                      {dinner.dinnerPortion.dinnerProducts.length > 0 &&
                        dinner.dinnerPortion.dinnerProducts.map(
                          ({
                            dinnerProduct,
                            dinnerProductId,
                            portion,
                            total,
                          }) => (
                            <Styled.DinnerProduct
                              key={dinnerProductId}
                              className="flex flex-grow"
                            >
                              <Styled.DinnerProductItem
                                style={{ width: "26rem" }}
                                className="w-40 p-5 border-r flex 2xl:w-64"
                              >
                                <span>
                                  {dinnerProduct.product.image && (
                                    <Image
                                      roundedDataGrid={true}
                                      imageId={dinnerProduct.product.image}
                                    />
                                  )}
                                  {dinnerProduct.product.name}
                                </span>
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                                {portion}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                {total.protein.gram}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                {total.fat.gram}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                {total.carbohydrates.gram}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                {total.kcal}
                              </Styled.DinnerProductItem>
                            </Styled.DinnerProduct>
                          )
                        )}
                      {meal.dinners.length > 1 && (
                        <Styled.DinnerWrapper className="flex items-center w-full">
                          <Styled.DinnerNameWrapper className="w-80 p-5 border-r 2xl:w-[32rem]">
                            <b>Razem:</b>
                          </Styled.DinnerNameWrapper>
                          <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                            <b>-</b>
                          </Styled.DinnerProductItem>
                          <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                            <b>{dinner.dinnerPortion.total.protein.gram}</b>
                          </Styled.DinnerProductItem>
                          <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                            <b>{dinner.dinnerPortion.total.fat.gram}</b>
                          </Styled.DinnerProductItem>
                          <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                            <b>
                              {dinner.dinnerPortion.total.carbohydrates.gram}
                            </b>
                          </Styled.DinnerProductItem>
                          <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                            <b>{dinner.dinnerPortion.total.kcal}</b>
                          </Styled.DinnerProductItem>
                        </Styled.DinnerWrapper>
                      )}
                    </Styled.DinnerProductsWrapper>
                  </Styled.DinnerWrapper>

                  <Styled.DinnerWrapper className="flex items-center w-full">
                    <Styled.DinnerNameWrapper className="w-80 p-5 border-r 2xl:w-[32rem]">
                      <b>Razem:</b>
                    </Styled.DinnerNameWrapper>
                    <Styled.DinnerNameWrapper className="w-80 p-5 border-r 2xl:w-[32rem]"></Styled.DinnerNameWrapper>
                    <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                      <b>-</b>
                    </Styled.DinnerProductItem>
                    <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                      <b>{meal.total.protein.gram}</b>
                    </Styled.DinnerProductItem>
                    <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                      <b>{meal.total.fat.gram}</b>
                    </Styled.DinnerProductItem>
                    <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                      <b>{meal.total.carbohydrates.gram}</b>
                    </Styled.DinnerProductItem>
                    <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                      <b>{meal.total.kcal}</b>
                    </Styled.DinnerProductItem>
                  </Styled.DinnerWrapper>

                  {/* {columns.map((column) => (
                              <div
                                key={column.key}
                                className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32"
                              >
                                {dinnerProduct.macrohydrates[column.key]}
                              </div>
                            ))} */}
                </>
              ))}
          </Styled.MealDinnersWrapper>
        </Styled.Meal>

        {/* <div className="flex border-x border-b items-center w-full">
          <div className=" w-[30rem] p-5 border-r 2xl:w-[32rem] 2xl:flex-auto">
            Razem:{" "}
            <b>
              {" "}
              {meal.total.procent} / {meal.establishments.procent} %
            </b>
          </div>
          <div className="w-20 p-5 border-r 2xl:w-32">
            <b>{meal.total.gram}</b>
          </div>
          <MealMacroTotalItem
            total={meal.total.protein.gram}
            establishment={meal.establishments.protein.gram}
            macroDifferentMeal={elasticEstablishment}
          />

          <MealMacroTotalItem
            total={meal.total.fat.gram}
            establishment={meal.establishments.fat.gram}
            macroDifferentMeal={elasticEstablishment}
          />

          <MealMacroTotalItem
            total={meal.total.carbohydrates.gram}
            establishment={meal.establishments.carbohydrates.gram}
            macroDifferentMeal={elasticEstablishment}
          />

          <MealMacroTotalItem
            total={meal.total.kcal}
            establishment={meal.establishments.kcal}
            macroDifferentMeal={elasticEstablishment}
          />
        </div> */}
      </Styled.MealWrapper>

      <Modal
        onClose={() => setDinnerModalOpen(false)}
        open={addDinnerModalOpen}
      >
        <AddDinnerModalContent
          meal={meal}
          closeModal={() => setDinnerModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export const procentClasses = (procent: number) => {
  if (procent >= 50) {
    return "text-red-400";
  }

  if (procent <= 5) {
    return "text-green-500";
  }
  return "text-yellow-400";
};

export const procentCount = (dietMacro: number, establishmentMacro: number) => {
  const missingMacro = establishmentMacro - dietMacro;
  const procent = (Math.abs(missingMacro) * 100) / establishmentMacro;
  return roundMacro(procent);
};

const roundMacro = (macro: number) => {
  return Math.round(macro * 1e2) / 1e2;
};

interface IMealMacroTotal {
  total: number;
  establishment: number;
  macroDifferentMeal?: boolean;
}

const MealMacroTotalItem = ({
  total,
  establishment,
  macroDifferentMeal,
}: IMealMacroTotal) => {
  const [macroModalOpen, setMacroModalOpen] = useState(false);

  return (
    <div
      className="w-20 p-5 2xl:w-32 border-r last-of-type:border-0 relative"
      onMouseEnter={() => setMacroModalOpen(true)}
      onMouseLeave={() => setMacroModalOpen(false)}
    >
      <b
        className={` ${
          !macroDifferentMeal
            ? procentClasses(procentCount(total, establishment))
            : "text-slate-700"
        }`}
      >
        {total}
      </b>
      {!macroDifferentMeal && macroModalOpen && (
        <MacroModal total={total} establishment={establishment} />
      )}
    </div>
  );
};

const MacroModal = ({ total, establishment }: IMealMacroTotal) => {
  return (
    <div className="absolute flex items-center justify-center top-3/4 left-0 w-full px-5 py-3 bg-black z-10 rounded-md">
      <p className=" font-medium text-xs text-white">
        <b>{total} </b> / {establishment}
      </p>
    </div>
  );
};

export default Meal;
