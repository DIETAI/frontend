import React, { useState } from "react";
import { getDinnerPortionsQuery } from "services/getDinnerPortions";
import {
  procentClasses,
  percentageRangeClasses,
} from "../../utils/procentClasses";

import useSWR, { useSWRConfig } from "swr";

//helpers
import { generateMeal } from "./helpers/generateMealV3";
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

//store
import {
  addDietMealGenerate,
  IDietMealGenerate,
  removeMealGenerate,
} from "store/dietMealGenerate";
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";

//components
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";

//icons
import { FaUserCog, FaPlus, FaExchangeAlt, FaUtensils } from "icons/icons";

//styles
import * as Styled from "./MealGenerateModal.styles";

import axios from "utils/api";
import { useParams } from "react-router";
import {
  IDinnerPortionData,
  IDinnerPortionQueryData,
} from "interfaces/dinner/dinnerPortions.interfaces";
import { AnimatePresence } from "framer-motion";
import { IDietMealData } from "interfaces/diet/dietMeals.interfaces";
import {
  IDietMealPopulateData,
  IDietPopulateData,
} from "interfaces/diet/dietPopulate.interfaces";

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

type IMealGenerateOption = "changeAmountAddedMealDinners" | "newMeal";

const MealGenerateModal = ({
  meal,
  mealEstablishment,
  dietEstablishment,
  closeModal,
}: {
  meal: IDietMealPopulateData;
  mealEstablishment: IDietPopulateData["establishmentId"]["meals"][0];
  dietEstablishment: IDietPopulateData["establishmentId"];
  closeModal: () => void;
}) => {
  const { mutate } = useSWRConfig();
  const { dietEditId } = useParams();
  const [mealGenerateOption, setMealGenerateOption] =
    useState<IMealGenerateOption>("newMeal");
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

  // const { dietMeals, dietMealsLoading, dietMealsError } = getAllDietMeals();

  // if (!dietMeals) return null;

  const handleGenerateDietMeal = async () => {
    setMealGenerateAction({
      actionType: "Selected meal",
      actionMessage: "Wybieranie posiłku",
      loading: true,
      error: false,
      errorMessage: "",
    });
    const allDietMeals = await axios.get<IDietMealData[]>(`/api/v1/dietMeals`, {
      withCredentials: true,
    });

    if (!allDietMeals.data) {
      return;
    }

    const generateMealInitialData = {
      mealToGenerate: meal,
      allDietMeals: allDietMeals.data,
      dispatch,
      addDietMealGenerate,
      mealGenerateAction,
      setMealGenerateAction,
      dietEstablishment,
      mealEstablishment,
    };

    const generatedDietMeal = generateMeal({
      ...(generateMealInitialData as any),
    });

    console.log({ generatedDietMeal });

    // dispatch(addDietMealGenerate({}));
  };

  const addMealToDiet = async () => {
    //zapisać wygenerowany zestaw porcji jeśli nie jest już dodany! => validPortion
    //zapisać dietDinners
    console.log("add");

    console.log({ dietEditId });

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
              dinnerPortionProducts: newDinnerPortionProductsData as any,
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
            dietId: dietEditId,
            dayId: meal.dayId,
            dietMealId: meal._id,
            order: 1,
            dinnerId: mealDinner.dinnerId,
            dinnerPortionId: newDinnerPortion.data._id,
          };

          if (meal.dietDinners.length > 0) {
            await Promise.all(
              meal.dietDinners.map(async (dietDinner) => {
                const deletedDinner = await axios.delete(
                  `/api/v1/dietDinners/${dietDinner._id}`,
                  {
                    withCredentials: true,
                  }
                );

                console.log({ deletedDinner });
              })
            );
          }

          const newDietDinner = await axios.post(
            "/api/v1/dietDinners",
            newDietDinnerData,
            {
              withCredentials: true,
            }
          );

          console.log({ newDietDinner });

          dispatch(removeMealGenerate());
          closeModal();
          await mutate(`/api/v1/diets/${dietEditId}/query`); //correct
          return newDietDinner;
        }

        const newDietDinnerData = {
          dietId: dietEditId,
          dayId: meal.dayId,
          dietMealId: meal._id,
          order: 1,
          dinnerId: mealDinner.dinnerId,
          dinnerPortionId: mealDinner.portionId as string,
        };

        //delete added diet dinners
        if (meal.dietDinners.length > 0) {
          await Promise.all(
            meal.dietDinners.map(async (dietDinner) => {
              const deletedDinner = await axios.delete(
                `/api/v1/dietDinners/${dietDinner._id}`,
                {
                  withCredentials: true,
                }
              );

              console.log({ deletedDinner });
            })
          );
        }

        const newDietDinner = await axios.post(
          "/api/v1/dietDinners",
          newDietDinnerData,
          {
            withCredentials: true,
          }
        );

        console.log({ newDietDinner });
        dispatch(removeMealGenerate());
        closeModal();
        await mutate(`/api/v1/diets/${dietEditId}/query`); //correct
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

  const handleCloseModal = () => {
    dispatch(removeMealGenerate());
    closeModal();
  };

  const generateMealFromServer = async () => {
    setMealGenerateAction({
      actionType: "Selected meal",
      actionMessage: "Wybieranie posiłku",
      loading: true,
      error: false,
      errorMessage: "",
    });
    try {
      const generatedMeal = await axios.post(
        "/api/v1/dietGenerate/meal",
        { mealId: meal._id, mealGenerateOption },
        {
          withCredentials: true,
        }
      );
      console.log({ generatedMeal });

      setMealGenerateAction({
        actionType: "",
        actionMessage: "",
        loading: false,
        error: false,
        errorMessage: "",
      });

      dispatch(addDietMealGenerate(generatedMeal.data.generatedMealObj));
    } catch (e) {
      console.log(e);
      setMealGenerateAction({
        actionType: "",
        actionMessage: "",
        loading: false,
        error: true,
        errorMessage: "Nie udało się wygenerować posiłku",
      });
    }
  };

  return (
    <Styled.GenerateMealModalContainer>
      <Heading icon={<FaUtensils />} title="Generowanie posiłku" />
      <Styled.MealGenerateContentWrapper>
        {mealDinners.length < 1 && (
          <Styled.ContentWrapper>
            <Styled.MealToGenerateOptionsWrapper>
              <Styled.MealToGenerateOption
                onClick={() => setMealGenerateOption("newMeal")}
                active={mealGenerateOption === "newMeal"}
                type="newMeal"
              >
                <FaPlus />
                <h2>
                  {meal.dietDinners.length > 0
                    ? "zamień dodane potrawy"
                    : "generuj nowe potrawy"}
                </h2>
              </Styled.MealToGenerateOption>
              <Styled.MealToGenerateOption
                onClick={() =>
                  setMealGenerateOption("changeAmountAddedMealDinners")
                }
                type="changeAmountAddedMealDinners"
                active={mealGenerateOption === "changeAmountAddedMealDinners"}
                disabled={meal.dietDinners.length < 1}
              >
                <FaExchangeAlt />

                <h2>
                  dostosuj zestaw porcji do założeń dla już dodanych potraw
                </h2>
              </Styled.MealToGenerateOption>
            </Styled.MealToGenerateOptionsWrapper>

            <Styled.ContentButtonsWrapper>
              <Button
                variant={!mealGenerateOption ? "disabled" : "primary"}
                type="button"
                onClick={generateMealFromServer as any}
              >
                generuj posiłek
              </Button>

              <Button type="button" onClick={closeModal} variant="secondary">
                anuluj
              </Button>
            </Styled.ContentButtonsWrapper>
          </Styled.ContentWrapper>
        )}
        <AnimatePresence>
          {mealGenerateAction.loading && (
            <Styled.LoadingWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReactLoading type="spin" color="blue" height={50} width={50} />
              <h2>{mealGenerateAction.actionMessage}</h2>
            </Styled.LoadingWrapper>
          )}
        </AnimatePresence>

        {mealDinners.length > 0 && !mealGenerateAction.loading && (
          <>
            <Styled.GeneratedMealNavWrapper>
              <h3>{meal.name}</h3>
              <Styled.GeneratedMealNavButtonsWrapper>
                <Button
                  type="button"
                  onClick={handleGenerateDietMeal as any}
                  variant="secondary"
                >
                  generuj ponownie posiłek
                </Button>
                <Button type="button" onClick={addMealToDiet as any}>
                  dodaj posiłek do diety
                </Button>
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  variant="secondary"
                >
                  anuluj
                </Button>
              </Styled.GeneratedMealNavButtonsWrapper>
            </Styled.GeneratedMealNavWrapper>
            <Styled.OneDayViewTotalWrapper>
              <TotalItem
                macroType="B (g)"
                variant={percentageRangeClasses({
                  minValue: dietEstablishment.protein.min_procent,
                  maxValue: dietEstablishment.protein.max_procent,
                  value:
                    selectedMealGroup?.macroTotalCount.total_protein_procent ||
                    0,
                })}
                macroProcent={
                  selectedMealGroup?.macroTotalCount.total_protein_procent
                }
                totalValue={
                  selectedMealGroup?.macroTotalCount.total_protein_gram
                }
                modalContent={`${dietEstablishment.protein.min_procent} - ${dietEstablishment.protein.max_procent} %`}
              />

              <TotalItem
                macroType="T (g)"
                variant={percentageRangeClasses({
                  minValue: dietEstablishment.fat.min_procent,
                  maxValue: dietEstablishment.fat.max_procent,
                  value:
                    selectedMealGroup?.macroTotalCount.total_fat_procent || 0,
                })}
                macroProcent={
                  selectedMealGroup?.macroTotalCount.total_fat_procent
                }
                totalValue={selectedMealGroup?.macroTotalCount.total_fat_gram}
                modalContent={`${dietEstablishment.fat.min_procent} - ${dietEstablishment.fat.max_procent} %`}
              />

              <TotalItem
                macroType="W (g)"
                variant={percentageRangeClasses({
                  minValue: dietEstablishment.carbohydrates.min_procent,
                  maxValue: dietEstablishment.carbohydrates.max_procent,
                  value:
                    selectedMealGroup?.macroTotalCount
                      .total_carbohydrates_procent || 0,
                })}
                macroProcent={
                  selectedMealGroup?.macroTotalCount.total_carbohydrates_procent
                }
                totalValue={
                  selectedMealGroup?.macroTotalCount.total_carbohydrates_gram
                }
                modalContent={`${dietEstablishment.carbohydrates.min_procent} - ${dietEstablishment.carbohydrates.max_procent} %`}
              />

              <Styled.OneDayViewTotalItem
                variant={procentClasses({
                  establishment: mealEstablishment.kcal,
                  total: selectedMealGroup?.macroTotalCount.total_kcal || 0,
                })}
              >
                <h2>Kcal:</h2>
                <p>
                  <b>{selectedMealGroup?.macroTotalCount.total_kcal}</b>/
                  {mealEstablishment.kcal}
                </p>
              </Styled.OneDayViewTotalItem>
            </Styled.OneDayViewTotalWrapper>
            {/* <Styled.SelectedGroupInfo>
              <p>wybrana grupa na podstawie: </p>
              <h3> {selectedMealGroup?.description}</h3>
            </Styled.SelectedGroupInfo> */}

            <Styled.PortionsWrapper>
              {mealDinners.map((mealDinner, dinnerIndex) => (
                <DinnerPortion
                  key={mealDinner.dinnerId}
                  mealDinner={mealDinner}
                  dinnerIndex={dinnerIndex}
                />
              ))}
            </Styled.PortionsWrapper>
          </>
        )}
      </Styled.MealGenerateContentWrapper>
    </Styled.GenerateMealModalContainer>
  );
};

const TotalItem = ({
  macroType,
  macroProcent,
  totalValue,
  modalContent,
  variant,
}: {
  macroType: string;
  macroProcent?: number;
  totalValue?: number;
  modalContent: string;
  variant?: "red" | "yellow" | "green";
}) => {
  const [totalItemModalOpen, setTotalItemModalOpen] = useState(false);
  return (
    <Styled.TotalItem
      onMouseEnter={() => setTotalItemModalOpen(true)}
      onMouseLeave={() => setTotalItemModalOpen(false)}
      variant={variant}
    >
      <h2>{macroType}:</h2>
      <p>
        <b>{totalValue}</b>
      </p>
      {macroProcent && (
        <h3>
          ({macroProcent}
          %)
        </h3>
      )}

      <AnimatePresence>
        {totalItemModalOpen && (
          <Styled.TotalItemModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>{modalContent}</p>
          </Styled.TotalItemModal>
        )}
      </AnimatePresence>
    </Styled.TotalItem>
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
