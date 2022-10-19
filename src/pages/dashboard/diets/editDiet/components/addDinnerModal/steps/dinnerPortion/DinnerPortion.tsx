import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

import { getDinnerPortions } from "services/getDinnerPortions";
import { getDinnerPortionsQuery } from "services/getDinnerPortions";
import ReactLoading from "react-loading";

//styles
import * as Styled from "./DinnerPortion.styles";

//components
import Image from "components/form/images/image/Image";
import DinnerPortionDayMacroTotal from "./macroTotal/day/DinnerPortionDayMacroTotal";
import DinnerPortionMealMacroTotal from "./macroTotal/meal/DinnerPortionMealMacroTotal";

type IDinnerPortionOption = "added" | "recommend" | "new";

const DinnerPortion = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  const [dinnerPortionOption, setDinnerPortionOption] =
    useState<IDinnerPortionOption>("added");
  const selectedDinnerId = watch("dinnerId") as string;
  const selectedDinnerPortionId = watch("dinnerPortionId") as string;

  const {
    dinnerPortionsQuery,
    dinnerPortionsErrorQuery,
    dinnerPortionsLoadingQuery,
  } = getDinnerPortionsQuery(selectedDinnerId);

  useEffect(() => {
    if (dinnerPortionsQuery && !selectedDinnerPortionId) {
      const defaultPortion = dinnerPortionsQuery.find(
        (portion) => portion.type === "default"
      );
      setValue("dinnerPortionId", defaultPortion?._id);
      trigger();
    }
  }, [dinnerPortionsQuery, selectedDinnerPortionId]);

  if (dinnerPortionsLoadingQuery)
    return (
      <Styled.LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h2>pobieranie porcji</h2>
      </Styled.LoadingWrapper>
    );
  if (dinnerPortionsErrorQuery)
    return (
      <Styled.LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2>
          wystąpił problem podczas pobierania porcji, spróbuj ponownie później
        </h2>
      </Styled.LoadingWrapper>
    );

  const selectDinnerPortion = (dinnerPortionId: string) => {
    setValue("dinnerPortionId", dinnerPortionId);
    trigger();
  };

  return (
    <Styled.PortionsWrapper>
      <Styled.PortionsMacroContainer>
        <DinnerPortionDayMacroTotal />
        <DinnerPortionMealMacroTotal />
      </Styled.PortionsMacroContainer>

      <Styled.PortionFilterWrapper>
        <Styled.PortionNavItem
          activeOption={dinnerPortionOption === "added"}
          onClick={() => setDinnerPortionOption("added")}
        >
          wszystkie porcje
        </Styled.PortionNavItem>
        <Styled.PortionNavItem
          activeOption={dinnerPortionOption === "recommend"}
          onClick={() => setDinnerPortionOption("recommend")}
        >
          rekomendowane porcje
        </Styled.PortionNavItem>
        <Styled.PortionNavItem
          activeOption={dinnerPortionOption === "new"}
          onClick={() => setDinnerPortionOption("new")}
        >
          stwórz porcję
        </Styled.PortionNavItem>
      </Styled.PortionFilterWrapper>
      {dinnerPortionsQuery?.map((dinnerPortion, dinnerPortionIndex) => (
        <Styled.PortionWrapper
          key={dinnerPortion._id}
          onClick={() => selectDinnerPortion(dinnerPortion._id)}
          active={selectedDinnerPortionId === dinnerPortion._id}
        >
          <Styled.PortionHeadingWrapper>
            <Styled.PortionHeading>
              <Styled.FieldNumberWrapper>
                <p>{dinnerPortionIndex + 1}</p>
              </Styled.FieldNumberWrapper>
              <h2>
                {dinnerPortion.type === "default" ? "domyślny" : "własny"}{" "}
                zestaw
              </h2>
            </Styled.PortionHeading>
          </Styled.PortionHeadingWrapper>
          <Styled.PortionTotalWrapper>
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
          </Styled.PortionTotalWrapper>
          <Styled.ProductsWrapper>
            {dinnerPortion.dinnerProducts.map((dinnerPortionProduct) => (
              <Styled.ProductWrapper key={dinnerPortionProduct.dinnerProductId}>
                <Styled.ProductMainWrapper>
                  {dinnerPortionProduct.dinnerProduct.product.image && (
                    <div>
                      <Image
                        roundedDataGrid={true}
                        imageId={
                          dinnerPortionProduct.dinnerProduct.product.image
                        }
                      />
                    </div>
                  )}

                  <Styled.ProductContentWrapper>
                    <h3>{dinnerPortionProduct.dinnerProduct.product.name}</h3>

                    {/* <Styled.ProductTotalFeaturesWrapper>
                        <Styled.ProductTotalFeature>
                          Kcal: <b>{dinnerPortionProduct.total.kcal}</b>
                        </Styled.ProductTotalFeature>
                        <Styled.ProductTotalFeature>
                          B (g):{" "}
                          <b>{dinnerPortionProduct.total.protein.gram}</b>
                        </Styled.ProductTotalFeature>
                        <Styled.ProductTotalFeature>
                          T (g): <b>{dinnerPortionProduct.total.fat.gram}</b>
                        </Styled.ProductTotalFeature>
                        <Styled.ProductTotalFeature>
                          W (g):{" "}
                          <b>{dinnerPortionProduct.total.carbohydrates.gram}</b>
                        </Styled.ProductTotalFeature>
                        <Styled.ProductTotalFeature>
                          Wp (g):{" "}
                          <b>
                            {
                              dinnerPortionProduct.total.digestableCarbohydrates
                                .gram
                            }
                          </b>
                        </Styled.ProductTotalFeature>
                        <Styled.ProductTotalFeature>
                          Bł (g): <b>{dinnerPortionProduct.total.fiber.gram}</b>
                        </Styled.ProductTotalFeature>
                      </Styled.ProductTotalFeaturesWrapper> */}
                  </Styled.ProductContentWrapper>
                </Styled.ProductMainWrapper>

                <Styled.ProductPortionItem>
                  {dinnerPortionProduct.portion} g
                </Styled.ProductPortionItem>
              </Styled.ProductWrapper>
            ))}
          </Styled.ProductsWrapper>
        </Styled.PortionWrapper>
      ))}
    </Styled.PortionsWrapper>
  );
};

export default DinnerPortion;
