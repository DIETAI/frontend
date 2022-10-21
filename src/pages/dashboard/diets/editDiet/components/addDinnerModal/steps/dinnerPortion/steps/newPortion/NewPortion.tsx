import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

//form
import {
  useFieldArray,
  useFormContext,
  Control,
  FieldValues,
} from "react-hook-form";
import {
  getDinnerProduct,
  getDinnerProductQuery,
  getDinnerProductsQuery,
} from "services/getDinnerProducts";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getDinnerPortionsQuery } from "services/getDinnerPortions";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

//styles
import * as Styled from "./NewPortion.styles";

//interfaces
import { IDinnerProductQueryData } from "interfaces/dinner/dinnerProducts.interfaces";
import { ITotal } from "interfaces/total.interfaces";

//icons
import { FaUtensils } from "react-icons/fa";

//component
import Button from "components/form/button/Button";
import Heading from "components/heading/Heading";
import Image from "components/form/images/image/Image";
import MealTotal from "./mealTotal/MealTotal";

//schema
import {
  dinnerPortionSchema,
  IDinnerPortion,
} from "./schema/newPortion.schema";

const defaultValues = dinnerPortionSchema.cast({});

type IDinnerPortionValues = typeof defaultValues;

const NewPortion = ({ selectedDinnerId }: { selectedDinnerId: string }) => {
  // const addDinnerPortionDefaultValues = {
  //   ...defaultValues,
  //   dietId: meal.dietId,
  //   dayId: meal.dayId,
  //   dietMealId: meal._id,
  //   order: meal.dinners.length + 1,
  // };

  const methods = useForm({
    resolver: yupResolver(dinnerPortionSchema),
    shouldUnregister: false,
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    watch,
  } = methods;

  const { dinnerProductsQuery } = getDinnerProductsQuery(selectedDinnerId);

  if (!dinnerProductsQuery) return null;

  //   useEffect(() => {
  //     const total = sumTotal({
  //       dinnerPortionProducts: portionDinnerProducts as any,
  //     });
  //     return setValue("total", total);
  //   }, [...portionDinnerProducts.map(({ total }) => total)]);

  //   const validPortion = () => {
  //     const allPortionsComb = dinnerPortionsQuery?.map((portionQuery) =>
  //       portionQuery.dinnerProducts
  //         .map((product) =>
  //           (product.dinnerProductId + ":" + product.portion).trim()
  //         )
  //         .join("-")
  //     );
  //     const selectedProductsCombinationId = portionDinnerProducts
  //       .map((product) =>
  //         (product.dinnerProductId + ":" + product.portion).trim()
  //       )
  //       .join("-");

  //     // console.log({
  //     //   allPortionsComb,
  //     //   combination: selectedProductsCombinationId,
  //     // });

  //     if (allPortionsComb?.includes(selectedProductsCombinationId)) {
  //       return false;
  //     }

  //     return true;
  //   };

  //   console.log(validPortion());

  {
    /* {!validPortion() && (
        <h3 style={{ color: "red" }}>Istnieje już taki zestaw porcji</h3>
      )} */
  }

  const onCreatePortionSubmit = async (data: IDinnerPortionValues) => {
    console.log("Create portion");
  };

  return (
    <Styled.Container>
      <Styled.AddDinnerPortionWrapper>
        <FormProvider {...methods}>
          <Styled.FormWrapper autoComplete="off">
            <Heading icon={<FaUtensils />} title="Nowa porcja" />
            <MealTotal />
            <Styled.ProductsContainer>
              {dinnerProductsQuery.length > 0 &&
                dinnerProductsQuery.map((dinnerProduct, index) => (
                  <DinnerProduct
                    key={dinnerProduct._id}
                    fieldIndex={index}
                    dinnerProduct={dinnerProduct}
                  />
                ))}
            </Styled.ProductsContainer>
            <Button
              type="button"
              onClick={handleSubmit(onCreatePortionSubmit) as any}
              variant={isSubmitting || !isValid ? "disabled" : "primary"}
            >
              stwórz porcję
            </Button>
          </Styled.FormWrapper>
        </FormProvider>
      </Styled.AddDinnerPortionWrapper>
    </Styled.Container>
  );
};

interface IDinnerProductProps {
  dinnerProduct: IDinnerProductQueryData;
  fieldIndex: number;
}

interface ISelectedProductPortion {
  portion: number;
  total: ITotal;
}

const DinnerProduct = ({ dinnerProduct, fieldIndex }: IDinnerProductProps) => {
  const [selectedProductPortion, setSelectedProductPortion] =
    useState<ISelectedProductPortion>({
      portion: dinnerProduct.defaultAmount,
      total: countTotal({
        product: dinnerProduct.product,
        portion: dinnerProduct.defaultAmount,
      }),
    });

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const changePortion = (portion: number) => {
    const total = countTotal({ product: dinnerProduct.product, portion });
    setSelectedProductPortion({ portion, total });
  };

  //   const changePortion = (portion: number) => {
  //     console.log("changePortion");

  //     update(fieldIndex, {
  //       dinnerProductId,
  //       portion,
  //       total: countTotal({
  //         product: dinnerProductQuery.product,
  //         portion,
  //       }) as any,
  //     }); //add count total
  //   };

  return (
    <Styled.ProductWrapper>
      <Styled.ProductMainWrapper>
        {dinnerProduct.product.image && (
          <Image imageId={dinnerProduct.product.image} roundedDataGrid={true} />
        )}
        <Styled.ProductContentWrapper>
          <h2>{dinnerProduct.product.name}</h2>
          <h3>
            wybrana porcja: <b>{selectedProductPortion.portion} g</b>{" "}
          </h3>
          <Styled.ProductTotalFeaturesWrapper>
            <Styled.ProductTotalFeature>
              Kcal: <b>{selectedProductPortion.total.kcal}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              B (g): <b>{selectedProductPortion.total.protein.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              T (g): <b>{selectedProductPortion.total.fat.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              W (g): <b>{selectedProductPortion.total.carbohydrates.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              Wp (g):{" "}
              <b>{selectedProductPortion.total.digestableCarbohydrates.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              Bł (g): <b>{selectedProductPortion.total.fiber.gram}</b>
            </Styled.ProductTotalFeature>
          </Styled.ProductTotalFeaturesWrapper>
          <h3>dostępne porcje:</h3>{" "}
          <Styled.ProductPortionsWrapper>
            {dinnerProduct.portionsGram?.map((portion) => (
              <Styled.ProductPortionWrapper
                onClick={() => changePortion(portion)}
                key={portion}
                active={selectedProductPortion.portion === portion}
              >
                {portion}
              </Styled.ProductPortionWrapper>
            ))}
          </Styled.ProductPortionsWrapper>
        </Styled.ProductContentWrapper>
      </Styled.ProductMainWrapper>
      <Styled.ProductPortionItem>
        {selectedProductPortion.portion} g
      </Styled.ProductPortionItem>
    </Styled.ProductWrapper>
  );
};

export default NewPortion;
