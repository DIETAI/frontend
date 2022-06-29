import React from "react";
import * as Styled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";

//icons
import { FaUtensils } from "icons/icons";

interface IProductMacrohydrates {
  protein: IProductData["protein"];
  fat: IProductData["fat"];
  carbohydrates: IProductData["carbohydrates"];
  fiber: IProductData["fiber"];
}

const Macrohydrates = ({
  protein,
  fat,
  carbohydrates,
  fiber,
}: IProductMacrohydrates) => {
  return (
    <Styled.ProductStepWrapper>
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaUtensils />
        </Styled.IconWrapper>
        <h2>Makroskładniki</h2>
      </Styled.StepHeadingWrapper>
      <Styled.ProductItemsWrapper>
        <Styled.ProductItem>
          <h2>białka (g): </h2>
          <p>{protein.gram}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>tłuszcze (g): </h2>
          <p>{fat.gram}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>węglowodany (g): </h2>
          <p>{carbohydrates.gram}</p>
        </Styled.ProductItem>
      </Styled.ProductItemsWrapper>
    </Styled.ProductStepWrapper>
  );
};

export default Macrohydrates;
