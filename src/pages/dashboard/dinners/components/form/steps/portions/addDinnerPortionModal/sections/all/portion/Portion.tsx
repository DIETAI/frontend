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

const Portion = ({ portion }: { portion: ICartesianResult }) => {
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
      <p>id zestawu: {portion.uid}</p>
      <p>makro total:</p>
      <h3>produkty:</h3>
      {portion.products.map((product) => (
        <PortionProduct product={product} key={product._id} />
      ))}
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
    <div>
      <h4>produkt: {dinnerProductQuery.product.name}</h4>{" "}
      <h4>wybrana porcja: {product.portionGram} g</h4>
    </div>
  );
};

export default Portion;
