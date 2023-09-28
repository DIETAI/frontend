import React, { useState } from "react";
import { useParams } from "react-router";
import axios from "utils/api";
import useSWR, { useSWRConfig } from "swr";

//styles
import * as Styled from "./GeneratedDietNav.styles";

//components
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  removeDietGenerate,
  IDietGenerateMeal,
  IGenerateDinner,
} from "store/dietGenerate";

//interfaces
import {
  IDinnerPortionData,
  IDinnerPortionQueryData,
} from "interfaces/dinner/dinnerPortions.interfaces";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

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
  };
};

const GeneratedDietNav = ({ closeModal }: { closeModal: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dietEditId } = useParams();
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  const { generatedDays, generateDietLoading } = useSelector(
    (state: RootState) => state.dietGenerate
  );

  const handleCloseModal = () => {
    dispatch(removeDietGenerate());
    closeModal();
  };

  const addDaysToDiet = async () => {
    console.log("add diet dinners and dietDayMeals to diet");
    setIsSubmitting(true);

    const newDietDietMeals = await Promise.all(
      generatedDays.map(async (day) => {
        const filteredNewMeals = day.meals?.filter(
          (meal) =>
            meal.generatedType === "new" ||
            meal.generatedType === "addedChangePortion"
        ) as IDietGenerateMeal[];

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
                      dinnerPortionProducts:
                        newDinnerPortionProductsData as any,
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

                //mutate dietquery obj
                await mutate(`/api/v1/diets/${dietEditId}/populate`); //correct

                setIsSubmitting(false);
                handleCloseModal();
              })
            );
          })
        );
      })
    );
  };

  const generatedDaysValid = generatedDays.every(
    (day) => day.action === "generated"
  );

  const buttonRender = () => {
    if (!generatedDaysValid) return "disabled";
    if (isSubmitting) return "disabled";

    return "primary";
  };

  return (
    <Styled.GeneratedDietNavWrapper>
      <Styled.GeneratedDietNavButtonsWrapper>
        <Button
          type="button"
          onClick={addDaysToDiet as any}
          variant={buttonRender()}
        >
          {isSubmitting ? (
            <ReactLoading type="spin" color="white" height={20} width={20} />
          ) : (
            "     dodaj do jadłospisu"
          )}
        </Button>
        <Button type="button" onClick={handleCloseModal} variant="secondary">
          anuluj
        </Button>
      </Styled.GeneratedDietNavButtonsWrapper>
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
    </Styled.GeneratedDietNavWrapper>
  );
};

export default GeneratedDietNav;
