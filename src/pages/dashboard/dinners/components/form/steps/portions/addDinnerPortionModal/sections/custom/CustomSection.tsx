import React, { useEffect } from "react";
import { useParams } from "react-router";

//form
import { useFieldArray, useFormContext, Control } from "react-hook-form";
import {
  getDinnerProduct,
  getDinnerProductQuery,
} from "services/getDinnerProducts";

import { getDinnerPortionsQuery } from "services/getDinnerPortions";

//interfaces
import { IDinnerPortion } from "../../schema/dinnerPortion.schema";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

//styles
import * as Styled from "./CustomSection.styles";
import Image from "components/form/images/image/Image";

const CustomSection = () => {
  const { dinnerId } = useParams();
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray<IDinnerPortion, "dinnerProducts", "id">({
      name: "dinnerProducts",
    });

  const { dinnerPortionsQuery } = getDinnerPortionsQuery(dinnerId as string);

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const portionDinnerProducts = watch(
    "dinnerProducts"
  ) as IDinnerPortion["dinnerProducts"];

  useEffect(() => {
    const total = sumTotal({
      dinnerPortionProducts: portionDinnerProducts as any,
    });
    return setValue("total", total);
  }, [...portionDinnerProducts.map(({ total }) => total)]);

  const validPortion = () => {
    const allPortionsComb = dinnerPortionsQuery?.map((portionQuery) =>
      portionQuery.dinnerProducts
        .map((product) =>
          (product.dinnerProductId + ":" + product.portion).trim()
        )
        .join("-")
    );
    const selectedProductsCombinationId = portionDinnerProducts
      .map((product) =>
        (product.dinnerProductId + ":" + product.portion).trim()
      )
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

  console.log(validPortion());

  return (
    <Styled.ProductsContainer>
      {!validPortion() && (
        <h3 style={{ color: "red" }}>Istnieje już taki zestaw porcji</h3>
      )}
      {fields.length > 0 &&
        fields.map((field, index) => (
          <DinnerProduct
            key={field.id}
            fieldIndex={index}
            dinnerProductId={field.dinnerProductId}
          />
        ))}
    </Styled.ProductsContainer>
  );
};

interface IDinnerProductProps {
  dinnerProductId: string;
  fieldIndex: number;
}

const DinnerProduct = ({
  dinnerProductId,
  fieldIndex,
}: IDinnerProductProps) => {
  // const { dinnerProduct, dinnerProductLoading, dinnerProductError } =
  //   getDinnerProduct(dinnerProductId);

  const {
    dinnerProductQuery,
    dinnerProductLoadingQuery,
    dinnerProductErrorQuery,
  } = getDinnerProductQuery(dinnerProductId);

  const { update } = useFieldArray<IDinnerPortion, "dinnerProducts", "id">({
    name: "dinnerProducts",
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
    console.log("changePortion");

    if (!dinnerProductQuery) return;

    update(fieldIndex, {
      dinnerProductId,
      portion,
      total: countTotal({
        product: dinnerProductQuery.product,
        portion,
      }) as any,
    }); //add count total
  };

  const selectedProductPortion = watch(
    `dinnerProducts.${fieldIndex}`
  ) as IDinnerPortion["dinnerProducts"][0];

  if (dinnerProductLoadingQuery) return <div>loading...</div>;
  if (dinnerProductErrorQuery) return <div>error..</div>;
  if (!dinnerProductQuery) return null;

  return (
    <Styled.ProductWrapper>
      <Styled.ProductMainWrapper>
        {dinnerProductQuery.product.image && (
          <Image
            imageId={dinnerProductQuery.product.image}
            roundedDataGrid={true}
          />
        )}
        <Styled.ProductContentWrapper>
          <h2>{dinnerProductQuery.product.name}</h2>
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
            {dinnerProductQuery?.portionsGram?.map((portion) => (
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

export default CustomSection;
