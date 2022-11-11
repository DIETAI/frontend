import React from "react";
import * as Styled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";

//icons
import { FaTh } from "icons/icons";

interface IProductMinerals {
  zinc: IProductData["zinc"];
  phosphorus: IProductData["phosphorus"];
  magnesium: IProductData["magnesium"];
  copper: IProductData["copper"];
  potassium: IProductData["potassium"];
  selenium: IProductData["selenium"];
  sodium: IProductData["sodium"];
  calcium: IProductData["calcium"];
  iron: IProductData["iron"];
}

const Minerals = ({
  zinc,
  phosphorus,
  magnesium,
  copper,
  potassium,
  selenium,
  sodium,
  calcium,
  iron,
}: IProductMinerals) => {
  return (
    <Styled.ProductStepWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
    >
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaTh />
        </Styled.IconWrapper>
        <h2>Składniki mineralne</h2>
      </Styled.StepHeadingWrapper>
      <Styled.ProductItemsWrapper>
        <Styled.ProductItem>
          <h2>cynk ({zinc?.unit}): </h2>
          <p>{zinc?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>fosfor ({phosphorus?.unit}): </h2>
          <p>{phosphorus?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>magnez ({magnesium?.unit}): </h2>
          <p>{magnesium?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>miedź ({copper?.unit}): </h2>
          <p>{copper?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>potas ({potassium?.unit}): </h2>
          <p>{potassium?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>selen ({selenium?.unit}): </h2>
          <p>{selenium?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>sód ({sodium?.unit}): </h2>
          <p>{sodium?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>wapń ({calcium?.unit}): </h2>
          <p>{calcium?.amount || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>żelazo ({iron?.unit}): </h2>
          <p>{iron?.amount || "-"}</p>
        </Styled.ProductItem>
      </Styled.ProductItemsWrapper>
    </Styled.ProductStepWrapper>
  );
};

export default Minerals;
