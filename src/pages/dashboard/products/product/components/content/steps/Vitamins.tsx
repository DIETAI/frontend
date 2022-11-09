import React from "react";
import * as Styled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";

//icons
import { FaGripHorizontal } from "icons/icons";

interface IProductVitamins {
  vitaminA: IProductData["vitaminA"];
  vitaminB1: IProductData["vitaminB1"];
  vitaminB2: IProductData["vitaminB2"];
  vitaminPP: IProductData["vitaminPP"];
  vitaminB5: IProductData["vitaminB5"];
  vitaminB6: IProductData["vitaminB6"];
  biotin: IProductData["biotin"];
  folicAcid: IProductData["folicAcid"];
  vitaminB12: IProductData["vitaminB12"];
  vitaminC: IProductData["vitaminC"];
  vitaminD: IProductData["vitaminD"];
  vitaminE: IProductData["vitaminE"];
  vitaminK: IProductData["vitaminK"];
}

const Vitamins = ({
  vitaminA,
  vitaminB1,
  vitaminB2,
  vitaminPP,
  vitaminB5,
  vitaminB6,
  biotin,
  folicAcid,
  vitaminB12,
  vitaminC,
  vitaminD,
  vitaminE,
  vitaminK,
}: IProductVitamins) => {
  return (
    <Styled.ProductStepWrapper>
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaGripHorizontal />
        </Styled.IconWrapper>
        <h2>Witaminy</h2>
      </Styled.StepHeadingWrapper>
      <Styled.ProductItemsWrapper>
        <Styled.ProductItem>
          <h2>witamina A ({vitaminA?.unit}): </h2>
          <p>{vitaminA?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B1 (tiamina) ({vitaminB1?.unit}): </h2>
          <p>{vitaminB1?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B2 (ryboflawina) ({vitaminB2?.unit}): </h2>
          <p>{vitaminB2?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B3 (niacyna) ({vitaminPP?.unit}): </h2>
          <p>{vitaminPP?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B5 (kwas pantotenowy) ({vitaminB5?.unit}): </h2>
          <p>{vitaminB5?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B6 (pirydoksyna) ({vitaminB6?.unit}): </h2>
          <p>{vitaminB6?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B7 (biotyna) ({biotin?.unit}): </h2>
          <p>{biotin?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B9 (kwas foliowy) ({folicAcid?.unit}): </h2>
          <p>{folicAcid?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina B12 (kobalamina) ({vitaminB12?.unit}): </h2>
          <p>{vitaminB12?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina C ({vitaminC?.unit}): </h2>
          <p>{vitaminC?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina D ({vitaminD?.unit}): </h2>
          <p>{vitaminD?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina E ({vitaminE?.unit}): </h2>
          <p>{vitaminE?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>witamina K ({vitaminK?.unit}): </h2>
          <p>{vitaminK?.amount || "-"}</p>
        </Styled.ProductItem>
      </Styled.ProductItemsWrapper>
    </Styled.ProductStepWrapper>
  );
};

export default Vitamins;
