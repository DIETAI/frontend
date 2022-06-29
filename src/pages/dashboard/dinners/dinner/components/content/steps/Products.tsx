import React from "react";
import * as Styled from "../DinnerContent.styles";
import { IDinnerData } from "interfaces/dinner.interfaces";

//icons
import { FaUtensils } from "icons/icons";

interface IDinnerProducts {
  products: IDinnerData["products"];
}

const Macrohydrates = ({ products }: IDinnerProducts) => {
  return (
    <Styled.DinnerStepWrapper>
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaUtensils />
        </Styled.IconWrapper>
        <h2>Produkty</h2>
      </Styled.StepHeadingWrapper>
      <Styled.DinnerItemsWrapper>
        {products.length > 0 &&
          products.map((product) => (
            <Styled.DinnerItem key={product.productId}>
              {product.productId}
            </Styled.DinnerItem>
          ))}
      </Styled.DinnerItemsWrapper>
    </Styled.DinnerStepWrapper>
  );
};

export default Macrohydrates;
