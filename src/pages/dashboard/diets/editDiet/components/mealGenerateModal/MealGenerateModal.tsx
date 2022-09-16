import React, { useState } from "react";
import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";
import { getAllDietMeals } from "services/getDietMeals";
import { getDinnerPortionsQuery } from "services/getDinnerPortions";

//helpers
import { generateMeal } from "./helpers/generateMeal";
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

//store
import { addDietMealGenerate, IDietMealGenerate } from "store/dietMealGenerate";
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  IDietEstablishmentData,
  IDietEstablishmentMeal,
} from "interfaces/dietEstablishment.interfaces";

//components
import Heading from "components/heading/Heading";

//icons
import { FaUserCog } from "icons/icons";

//styles
import * as Styled from "./MealGenerateModal.styles";

import axios from "utils/api";
import { useParams } from "react-router";
import { mutate } from "swr";
import {
  IDinnerPortionData,
  IDinnerPortionQueryData,
} from "interfaces/dinner/dinnerPortions.interfaces";
import { IDinnerPortion } from "pages/dashboard/dinners/components/form/steps/portions/addDinnerPortionModal/schema/dinnerPortion.schema";

export interface IMealGenerateAction {
  actionType: string;
  actionMessage: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

interface IValidPortion {
  dinnerPortionsQuery: IDinnerPortionQueryData[];
  mealDinner: IDietMealGenerate["mealDinners"][0];
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

const MealGenerateModal = ({
  meal,
  mealEstablishment,
  dietEstablishment,
  closeModal,
}: {
  meal: IDietMealQueryData;
  mealEstablishment: IDietEstablishmentMeal;
  dietEstablishment: IDietEstablishmentData;
  closeModal: () => void;
}) => {
  const { dietEditId } = useParams();
  const [mealGenerateAction, setMealGenerateAction] =
    useState<IMealGenerateAction>({
      actionType: "",
      actionMessage: "",
      loading: false,
      error: false,
      errorMessage: "",
    });

  const dispatch = useDispatch();
  const { mealDinners, dietMeal, selectedMealGroup } = useSelector(
    (state: RootState) => state.dietMealGenerate
  );

  const { dietMeals } = getAllDietMeals();

  if (!dietMeals) return null;

  const handleGenerateDietMeal = async () => {
    const generatedDietMeal = await generateMeal({
      mealToGenerate: meal,
      allDietMeals: dietMeals,
      dispatch,
      addDietMealGenerate,
      mealGenerateAction,
      setMealGenerateAction,
      dietEstablishment,
      mealEstablishment,
    });

    // dispatch(addDietMealGenerate({}));
  };

  const addMealToDiet = async () => {
    //zapisać wygenerowany zestaw porcji jeśli nie jest już dodany! => validPortion
    //zapisać dietDinners
    console.log("add");

    const validMealDinnersPortions = await Promise.all(
      mealDinners.map(async (mealDinner) => {
        const dinnerPortions = await axios.get<IDinnerPortionQueryData[]>(
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

    const addMealDietDinners = await Promise.all(
      validMealDinnersPortions.map(async (mealDinner) => {
        if (mealDinner?.validatePortion) {
          // : IDinnerPortion["dinnerProducts"]
          const newDinnerPortionProductsData = mealDinner.dinnerProducts.map(
            (dinnerProduct) => ({
              dinnerProductId: dinnerProduct.dinnerProductId,
              portion: dinnerProduct.portion,
              total: countTotal({
                product: dinnerProduct.product,
                portion: dinnerProduct.portion,
              }),
            })
          );

          // IDinnerPortion
          const newDinnerPortionData = {
            type: "custom",
            total: sumTotal({
              dinnerPortionProducts: newDinnerPortionProductsData,
            }),
            dinnerProducts: newDinnerPortionProductsData,
          };

          console.log({ newDinnerPortionData });

          const newDinnerPortion = await axios.post<IDinnerPortionData>(
            "/api/v1/dinnerPortions",
            { ...newDinnerPortionData, dinnerId: mealDinner.dinnerId },
            {
              withCredentials: true,
            }
          );

          console.log({ newDinnerPortion });

          const newDietDinnerData = {
            dietId: meal.dietId,
            dayId: meal.dayId,
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

          closeModal();
          return newDietDinner;
        }

        const newDietDinnerData = {
          dietId: meal.dietId,
          dayId: meal.dayId,
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

        closeModal();
        return newDietDinner;
      })
    );

    // try {
    //   const newDietDinner = await axios.post("/api/v1/dietDinners", data, {
    //     withCredentials: true,
    //   });
    //   console.log({ newDietDinner });

    //   //mutate dietquery obj
    //   await mutate(`/api/v1/diets/${dietEditId}/query`); //correct

    //   closeModal();
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <Styled.GenerateMealModalContainer>
      <Heading
        icon={<FaUserCog />}
        title="Generowanie posiłku"
        // title={t("diet.form.dinner.modal.title")}
        // description={t("diet.form.dinner.modal.description")}
      />
      {mealGenerateAction.loading && (
        <div>
          <h2>loading...</h2>
          <p>{mealGenerateAction.actionMessage}</p>
        </div>
      )}

      {(!mealGenerateAction.loading || mealDinners.length < 1) && (
        <div>
          <button type="button" onClick={handleGenerateDietMeal}>
            generuj posiłek
          </button>
        </div>
      )}

      {mealDinners.length > 0 && (
        <div>
          <h3>
            razem: {selectedMealGroup?.macroTotalCount.total_kcal} /{" "}
            {mealEstablishment.kcal} kcal
          </h3>

          <h3>wygenerowane posiłki</h3>
          <Styled.PortionsWrapper>
            {mealDinners.map((mealDinner, dinnerIndex) => (
              <DinnerPortion
                key={mealDinner.dinnerId}
                mealDinner={mealDinner}
                dinnerIndex={dinnerIndex}
              />
            ))}
          </Styled.PortionsWrapper>
          <button onClick={addMealToDiet} type="button">
            dodaj posiłek do diety
          </button>
        </div>
      )}
    </Styled.GenerateMealModalContainer>
  );
};

const DinnerPortion = ({
  mealDinner,
  dinnerIndex,
}: {
  mealDinner: RootState["dietMealGenerate"]["mealDinners"][0];
  dinnerIndex: number;
}) => {
  const { dinnerPortionsQuery } = getDinnerPortionsQuery(mealDinner.dinnerId);

  const validPortion = () => {
    const allPortionsComb = dinnerPortionsQuery?.map((portionQuery) =>
      portionQuery.dinnerProducts
        .map((product) =>
          (product.dinnerProduct.productId + ":" + product.portion).trim()
        )
        .join("-")
    );

    const selectedProductsCombinationId = mealDinner.dinnerProducts
      .map((product) => (product.productId + ":" + product.portion).trim())
      .join("-");

    // console.log({
    //   allPortionsComb,
    //   combination: selectedProductsCombinationId,
    // });

    if (allPortionsComb?.includes(selectedProductsCombinationId)) {
      return false;
    }

    return true;
  };

  return (
    <Styled.PortionWrapper>
      {/* {!validPortion() && (
        <h3 style={{ color: "red" }}>Istnieje już taki zestaw porcji</h3>
      )} */}
      <Styled.PortionHeadingWrapper>
        <Styled.PortionHeading>
          <Styled.FieldNumberWrapper>
            <p>{dinnerIndex + 1}</p>
          </Styled.FieldNumberWrapper>
          <h2>{mealDinner.dinnerName}</h2>
        </Styled.PortionHeading>
      </Styled.PortionHeadingWrapper>
      {/* <Styled.PortionTotalWrapper>
            <Styled.PortionTotalFeaturesWrapper>
              <Styled.PortionTotalFeature>
                Kcal: <b>{dinnerPortion.total.kcal}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                B (g): <b>{dinnerPortion.total.protein.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                T (g): <b>{dinnerPortion.total.fat.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                W (g): <b>{dinnerPortion.total.carbohydrates.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                Wp (g):{" "}
                <b>{dinnerPortion.total.digestableCarbohydrates.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                Bł (g): <b>{dinnerPortion.total.fiber.gram}</b>
              </Styled.PortionTotalFeature>
            </Styled.PortionTotalFeaturesWrapper>
          </Styled.PortionTotalWrapper> */}
      <Styled.ProductsWrapper>
        {mealDinner.dinnerProducts.map((dinnerPortionProduct) => (
          <Styled.ProductWrapper key={dinnerPortionProduct.productId}>
            <Styled.ProductMainWrapper>
              {/* {dinnerPortionProduct.dinnerProduct.product.image && (
                    <div>
                      <Image
                        roundedDataGrid={true}
                        imageId={
                          dinnerPortionProduct.dinnerProduct.product.image
                        }
                      />
                    </div>
                  )} */}

              <Styled.ProductContentWrapper>
                <h3>{dinnerPortionProduct.productName}</h3>

                <Styled.ProductTotalFeaturesWrapper>
                  <Styled.ProductTotalFeature>
                    Kcal: <b>{dinnerPortionProduct.portionKcal}</b>
                  </Styled.ProductTotalFeature>
                  <Styled.ProductTotalFeature>
                    B (g): <b>{dinnerPortionProduct.portionProteinGram}</b>
                  </Styled.ProductTotalFeature>
                  <Styled.ProductTotalFeature>
                    T (g): <b>{dinnerPortionProduct.portionFatGram}</b>
                  </Styled.ProductTotalFeature>
                  <Styled.ProductTotalFeature>
                    W (g):{" "}
                    <b>{dinnerPortionProduct.portionCarbohydratesGram}</b>
                  </Styled.ProductTotalFeature>
                  {/* <Styled.ProductTotalFeature>
                          Wp (g):{" "}
                          <b>
                            {
                              dinnerPortionProduct.total.digestableCarbohydrates
                                .gram
                            }
                          </b>
                        </Styled.ProductTotalFeature> */}
                  <Styled.ProductTotalFeature>
                    Bł (g): <b>{dinnerPortionProduct.portionFiberGram}</b>
                  </Styled.ProductTotalFeature>
                </Styled.ProductTotalFeaturesWrapper>
              </Styled.ProductContentWrapper>
            </Styled.ProductMainWrapper>

            <Styled.ProductPortionItem>
              {dinnerPortionProduct.portion} g
            </Styled.ProductPortionItem>
          </Styled.ProductWrapper>
        ))}
      </Styled.ProductsWrapper>
    </Styled.PortionWrapper>
  );
};

export default MealGenerateModal;
