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

//styles
import * as Styled from "./Meal.styles";

const Meal = ({ meal }: { meal: IDietMealQueryData }) => {
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
            <button
              type="button"
              // onClick={() => setMealPopupOpen(meal.id, true)}
              className=" w-6 h-6 rounded-full bg-orange-300 text-white text-xs absolute top-4 right-4"
            >
              +
            </button>
          </Styled.MealNameWrapper>
          <Styled.MealDinnersWrapper className="flex flex-col divide-y">
            {meal.dinners.length > 0 &&
              meal.dinners.map((dinner, index) => (
                <>
                  <Styled.DinnerWrapper key={dinner._id} className="flex">
                    <Styled.DinnerNameWrapper
                      style={{ width: "26rem" }}
                      className="w-40 p-5 border-r 2xl:w-64"
                    >
                      {/* {!dinner.name ? "-" : dinner.name} */}
                      {dinner.dinnerPortion.dinner.name}
                    </Styled.DinnerNameWrapper>

                    <Styled.DinnerProductsWrapper className="flex flex-col divide-y">
                      {dinner.dinnerPortion.dinnerProducts.length < 1 && (
                        <div className="flex flex-grow">
                          <div className="w-40 p-5 border-r flex 2xl:w-64">
                            -
                          </div>
                          <div className="w-20 p-5 border-r 2xl:w-32">-</div>

                          <div className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                            -
                          </div>
                          <div className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                            -
                          </div>
                          <div className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                            -
                          </div>
                          <div className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                            -
                          </div>
                        </div>
                      )}

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
                                {dinnerProduct.product.name}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r 2xl:w-32">
                                {portion}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                20
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                20
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                20
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32">
                                {total.kcal}
                              </Styled.DinnerProductItem>
                            </Styled.DinnerProduct>
                          )
                        )}
                    </Styled.DinnerProductsWrapper>
                  </Styled.DinnerWrapper>
                  {/* {columns.map((column) => (
                              <div
                                key={column.key}
                                className="w-20 p-5 border-r last-of-type:border-none 2xl:w-32"
                              >
                                {dinnerProduct.macrohydrates[column.key]}
                              </div>
                            ))} */}
                  {/* {row.dinners.length > 1 && (
                      <div className="flex items-center w-full">
                        <div className="w-80 p-5 border-r 2xl:w-[32rem]"></div>
                        <div className="w-20 p-5 border-r 2xl:w-32">
                          <b>{dinner.macrohydratesTotal.total_gram}</b>
                        </div>
                        <div className="w-20 p-5 border-r 2xl:w-32">
                          <b>{dinner.macrohydratesTotal.total_protein_gram}</b>
                        </div>
                        <div className="w-20 p-5 border-r 2xl:w-32">
                          <b>{dinner.macrohydratesTotal.total_fat_gram}</b>
                        </div>
                        <div className="w-20 p-5 border-r 2xl:w-32">
                          <b>
                            {dinner.macrohydratesTotal.total_carbohydrates_gram}
                          </b>
                        </div>
                        <div className="w-20 p-5 border-r 2xl:w-32">
                          <b>{dinner.macrohydratesTotal.total_kcal}</b>
                        </div>
                      </div>
                    )} */}
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
      {/* <ModalContainer
        modalIsOpen={mealPopupOpen}
        closeModal={() => setMealPopupOpen(false)}
      >
        <AddMealPopup meal={meal} mealEstablishment={{}} />
      </ModalContainer> */}
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
