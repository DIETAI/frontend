import React from "react";
import ReactLoading from "react-loading";
import axios from "utils/api";
import { useParams } from "react-router";

import {
  IDinnerPortionData,
  IDinnerPortionQueryData,
} from "interfaces/dinner/dinnerPortions.interfaces";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

//components
import GeneratedDays from "./generatedDays/GeneratedDays";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//icons
import { FaCarrot } from "icons/icons";

//styles
import * as Styled from "./GeneratedDietModal.styles";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  removeDietGenerate,
  IDietGenerateMeal,
  IGenerateDinner,
} from "store/dietGenerate";
import { ICartesianResult } from "../dietGenerateModal/helpers/cartesianDinners/cartesianDinners";

interface IValidPortion {
  dinnerPortionsQuery: IDinnerPortionQueryData[];
  mealDinner: IGenerateDinner;
}

const validPortion = ({ dinnerPortionsQuery, mealDinner }: IValidPortion) => {
  const allPortionsComb = dinnerPortionsQuery?.map((portionQuery) => {
    const portionId = portionQuery._id;
    const portionComb = portionQuery.dinnerProducts
      .map((product) =>
        (product.dinnerProduct.productId + ":" + product.portion).trim()
      )
      .join("-");

    return {
      portionId,
      portionComb,
    };
  });

  const selectedProductsCombinationId = mealDinner.dinnerProducts
    .map((product) => (product.productId + ":" + product.portion).trim())
    .join("-");

  // console.log({
  //   allPortionsComb,
  //   combination: selectedProductsCombinationId,
  // });

  const findPortion = allPortionsComb.find(
    (portion) => portion.portionComb === selectedProductsCombinationId
  );

  if (findPortion) {
    return {
      valid: false,
      dinnerPortionId: findPortion.portionId,
    };
  }

  return {
    valid: true,
    // dinnerPortionId: undefined,
  };

  // if (
  //   allPortionsComb
  //     ?.map(({ portionComb }) => portionComb)
  //     .includes(selectedProductsCombinationId)
  // ) {
  //   return false;
  // }

  // return true;
};

const GeneratedDietModal = ({ closeModal }: { closeModal: () => void }) => {
  const { dietEditId } = useParams();
  const dispatch = useDispatch();

  const { generatedDays, generateDietLoading } = useSelector(
    (state: RootState) => state.dietGenerate
  );

  const handleCloseModal = () => {
    dispatch(removeDietGenerate());
    closeModal();
  };

  const addDaysToDiet = async () => {
    console.log("add diet dinners and dietDayMeals to diet");

    const newDietDietMeals = await Promise.all(
      generatedDays.map(async (day) => {
        const filteredNewMeals = day.meals.filter(
          (meal) =>
            meal.generatedType === "new" ||
            meal.generatedType === "addedChangePortion"
        );

        console.log({ filteredNewMeals });

        const newDietDinners = await Promise.all(
          filteredNewMeals.map(async (meal) => {
            const mealDinners = meal.generatedDinners;

            if (!mealDinners) return;

            const validMealDinnersPortions = await Promise.all(
              mealDinners.map(async (mealDinner) => {
                const dinnerPortions = await axios.get<
                  IDinnerPortionQueryData[]
                >(
                  `/api/v1/dinnerPortions/dinner/${mealDinner.dinnerId}/query`,
                  { withCredentials: true }
                );

                console.log({ dinnerPortions });

                // const { dinnerPortionsQuery } = getDinnerPortionsQuery(
                //   mealDinner.dinnerId
                // );

                // console.log({ dinnerPortionsQuery });

                // if (!dinnerPortionsQuery)
                //   return {
                //     ...mealDinner,
                //     validatePortion: false,
                //     portionId: "",
                //   };

                const validatePortion = validPortion({
                  dinnerPortionsQuery: dinnerPortions.data,
                  mealDinner,
                });

                //if !validPortion => getPortionId
                const portionId = !validatePortion.valid
                  ? validatePortion.dinnerPortionId
                  : undefined;

                return {
                  ...mealDinner,
                  validatePortion: validatePortion.valid,
                  portionId,
                };
              })
            );

            console.log({ validMealDinnersPortions });

            //add portion validation

            const newDinners = await Promise.all(
              validMealDinnersPortions.map(async (mealDinner) => {
                if (mealDinner?.validatePortion) {
                  const newDinnerPortionProductsData =
                    mealDinner.dinnerProducts.map((dinnerProduct) => ({
                      dinnerProductId: dinnerProduct.dinnerProductId,
                      portion: dinnerProduct.portion,
                      total: countTotal({
                        product: dinnerProduct.product,
                        portion: dinnerProduct.portion,
                      }),
                    }));

                  // IDinnerPortion
                  const newDinnerPortionData = {
                    type: "custom",
                    dinnerId: mealDinner.dinnerId,
                    total: sumTotal({
                      dinnerPortionProducts: newDinnerPortionProductsData,
                    }),
                    dinnerProducts: newDinnerPortionProductsData,
                  };

                  const newDinnerPortion = await axios.post<IDinnerPortionData>(
                    "/api/v1/dinnerPortions",
                    newDinnerPortionData,
                    {
                      withCredentials: true,
                    }
                  );

                  console.log({ newDinnerPortion });

                  const newDietDinnerData = {
                    dietId: dietEditId,
                    dayId: day._id,
                    dietMealId: meal._id,
                    order: 1,
                    dinnerId: mealDinner.dinnerId,
                    dinnerPortionId: newDinnerPortion.data._id,
                  };

                  const newDietDinner = await axios.post(
                    "/api/v1/dietDinners",
                    newDietDinnerData,
                    {
                      withCredentials: true,
                    }
                  );

                  console.log({ newDietDinner });
                } else {
                  const newDietDinnerData = {
                    dietId: dietEditId,
                    dayId: day._id,
                    dietMealId: meal._id,
                    order: 1,
                    dinnerId: mealDinner.dinnerId,
                    dinnerPortionId: mealDinner.portionId as string,
                  };

                  const newDietDinner = await axios.post(
                    "/api/v1/dietDinners",
                    newDietDinnerData,
                    {
                      withCredentials: true,
                    }
                  );

                  console.log({ newDietDinner });
                }

                //deleteDinner
                if (meal.generatedType === "addedChangePortion") {
                  const deleteDinner = await axios.delete(
                    `/api/v1/dietDinners/${mealDinner._id}`,
                    {
                      withCredentials: true,
                    }
                  );

                  console.log({ deleteDinner });
                }

                handleCloseModal();
              })
            );
          })
        );
      })
    );
  };

  const handleGenerateDiet = () => {
    console.log("generate diet");
  };

  if (generateDietLoading)
    return (
      <Styled.LoadingWrapper>
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h3>generowanie diety</h3>
      </Styled.LoadingWrapper>
    );

  return (
    <Styled.GeneratedDietModalContainer>
      <Heading icon={<FaCarrot />} title="Wygenerowane dni" />
      <Styled.GeneratedDietNavWrapper>
        <Styled.GeneratedDietLegendWrapper>
          <Styled.GeneratedDietLegendItem generatedType="added">
            <span />
            <p>Dodane już posiłki do diety</p>
          </Styled.GeneratedDietLegendItem>
          <Styled.GeneratedDietLegendItem generatedType="addedChangePortion">
            <span />
            <p>Dodane posiłki do diety z dostosowanymi porcjami</p>
          </Styled.GeneratedDietLegendItem>
          <Styled.GeneratedDietLegendItem generatedType="new">
            <span />
            <p>Nowe wygenerowane posiłki</p>
          </Styled.GeneratedDietLegendItem>
        </Styled.GeneratedDietLegendWrapper>
        <Styled.GeneratedDietNavButtonsWrapper>
          {/* <Button
            type="button"
            onClick={handleGenerateDiet as any}
            variant="secondary"
          >
            generuj ponownie dietę
          </Button> */}
          <Button type="button" onClick={addDaysToDiet as any}>
            dodaj wygenerowane dni do diety
          </Button>
          <Button type="button" onClick={handleCloseModal} variant="secondary">
            anuluj
          </Button>
        </Styled.GeneratedDietNavButtonsWrapper>
      </Styled.GeneratedDietNavWrapper>
      <GeneratedDays />
      {/* {generateDietLoading ? (
        <Styled.DaysContainer>
          <ReactLoading type="spin" color="blue" height={50} width={50} />
          <h3>generowanie diety</h3>
        </Styled.DaysContainer>
      ) : (
        <GeneratedDays />
      )} */}

      {/* <Styled.DaysContainer>
        {days.map((day) => (
          <Styled.DayWrapper key={day._id}>
            {day.loading && (
              <div>
                <ReactLoading type="spin" color="blue" height={50} width={50} />
                <h3>generowanie diety dla dnia {day._id}</h3>
              </div>
            )}
          </Styled.DayWrapper>
        ))}
      </Styled.DaysContainer> */}
    </Styled.GeneratedDietModalContainer>
  );
};

export default GeneratedDietModal;
