import React from "react";
import * as Styled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";

//icons
import { FaCubes } from "icons/icons";

interface IProductMacrohydrates {
  protein: IProductData["protein"];
  fat: IProductData["fat"];
  carbohydrates: IProductData["carbohydrates"];
  fiber: IProductData["fiber"];
  digestibleCarbohydrates: IProductData["digestableCarbohydrates"];
  carbohydrateExchangers: IProductData["carbohydrateExchangers"];
  proteinFatExchangers: IProductData["proteinFatExchangers"];
}

const Macrohydrates = ({
  protein,
  fat,
  carbohydrates,
  fiber,
  digestibleCarbohydrates,
  carbohydrateExchangers,
  proteinFatExchangers,
}: IProductMacrohydrates) => {
  return (
    <Styled.ProductStepWrapper>
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaCubes />
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
        <Styled.ProductItem>
          <h2>błonnik (g): </h2>
          <p>{fiber.gram}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>węglowodany przyswajalne (g): </h2>
          <p>{digestibleCarbohydrates.gram}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>wymienniki węglowodanowe: </h2>
          <p>{carbohydrateExchangers}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>wymienniki białkowo-tłuszczowe: </h2>
          <p>{proteinFatExchangers}</p>
        </Styled.ProductItem>
      </Styled.ProductItemsWrapper>
    </Styled.ProductStepWrapper>
  );
};

export default Macrohydrates;
