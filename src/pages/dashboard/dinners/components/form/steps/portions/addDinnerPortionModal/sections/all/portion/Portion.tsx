import React, { useEffect } from "react";
import { useParams } from "react-router";
import { ICartesianResult } from "../../../helpers/cartesianGroups.helper";

//styles
import * as Styled from "./Portion.styles";

//query
import {
  getDinnerProductQuery,
  getDinnerProductsQuery,
} from "services/getDinnerProducts";

//form
import { useFormContext } from "react-hook-form";

//interfaces
import { IDinnerPortion } from "../../../schema/dinnerPortion.schema";

//helpers
import { sumTotal } from "helpers/sumTotal";
import { countTotal } from "helpers/countTotal";

//components
import Image from "components/form/images/image/Image";

const Portion = ({
  portion,
  portionIndex,
}: {
  portion: ICartesianResult;
  portionIndex: number;
}) => {
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

  const portionUID = watch("uid") as IDinnerPortion["uid"];

  const { dinnerId } = useParams();

  const {
    dinnerProductsQuery,
    dinnerProductsLoadingQuery,
    dinnerProductsErrorQuery,
  } = getDinnerProductsQuery(dinnerId as string);

  useEffect(() => {
    const total = sumTotal({
      dinnerPortionProducts: portionDinnerProducts as any,
    });
    return setValue("total", total);
  }, [...portionDinnerProducts.map(({ total }) => total)]);

  const addDinnerProducts = () => {
    console.log("dodano porcję");
    const newProducts = portion.products.map((portionProduct) => {
      const dinnerProduct = dinnerProductsQuery?.find(
        ({ _id }) => _id === portionProduct._id
      );

      if (!dinnerProduct) return;

      const newProduct = {
        dinnerProductId: portionProduct._id,
        portion: portionProduct.portionGram,
        total: countTotal({
          product: dinnerProduct.product, //product
          portion: portionProduct.portionGram,
        }) as any,
      };

      return newProduct;
    });
    setValue("dinnerProducts", newProducts);
    return setValue("uid", portion.uid);
  };

  return (
    <Styled.Portion
      active={portionUID === portion.uid}
      onClick={addDinnerProducts}
    >
      <Styled.PortionHeading>
        <Styled.FieldNumberWrapper active={portionUID === portion.uid}>
          <p>{portionIndex + 1}</p>
        </Styled.FieldNumberWrapper>
        <h3>{portion.uid.slice(0, 8)}...</h3>
      </Styled.PortionHeading>

      <p>makro total:</p>
      <h3>produkty:</h3>
      <Styled.PortionProductsWrapper>
        {portion.products.map((product) => (
          <PortionProduct product={product} key={product._id} />
        ))}
      </Styled.PortionProductsWrapper>
    </Styled.Portion>
  );
};

const PortionProduct = ({
  product,
}: {
  product: ICartesianResult["products"][0];
}) => {
  const {
    dinnerProductQuery,
    dinnerProductLoadingQuery,
    dinnerProductErrorQuery,
  } = getDinnerProductQuery(product._id);

  if (dinnerProductLoadingQuery) return <div>loading...</div>;
  if (dinnerProductErrorQuery) return <div>error...</div>;
  if (!dinnerProductQuery) return null;
  return (
    <Styled.PortionProduct>
      <Styled.PortionHeading>
        {dinnerProductQuery.product.image && (
          <Image
            imageId={dinnerProductQuery.product.image}
            roundedDataGrid={true}
          />
        )}
        <h3>{dinnerProductQuery.product.name}</h3>
      </Styled.PortionHeading>

      <Styled.ProductPortionItem>
        {product.portionGram} g
      </Styled.ProductPortionItem>
    </Styled.PortionProduct>
  );
};

export default Portion;
