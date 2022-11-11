import React from "react";
import * as Styled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";

//icons
import { FaTint } from "icons/icons";

interface IProductFattyAcids {
  saturatedFattyAcids: IProductData["saturatedFattyAcids"];
  pollyunsaturatedFattyAcids: IProductData["pollyunsaturatedFattyAcids"];
  pollyunsaturatedFattyAcidsOmega3: IProductData["pollyunsaturatedFattyAcidsOmega3"];
  pollyunsaturatedFattyAcidsOmega6: IProductData["pollyunsaturatedFattyAcidsOmega6"];
  monounsaturatedFattyAcids: IProductData["monounsaturatedFattyAcids"];
}

const FattyAcids = ({
  saturatedFattyAcids,
  pollyunsaturatedFattyAcids,
  pollyunsaturatedFattyAcidsOmega3,
  pollyunsaturatedFattyAcidsOmega6,
  monounsaturatedFattyAcids,
}: IProductFattyAcids) => {
  return (
    <Styled.ProductStepWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
    >
      <Styled.StepHeadingWrapper>
        <Styled.IconWrapper>
          <FaTint />
        </Styled.IconWrapper>
        <h2>Kwasy tłuszczowe</h2>
      </Styled.StepHeadingWrapper>
      <Styled.ProductItemsWrapper>
        <Styled.ProductItem>
          <h2>nasycone kwasy tłuszczowe: </h2>
          <p>{saturatedFattyAcids || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>wielonienasycone kwasy tłuszczowe: </h2>
          <p>{pollyunsaturatedFattyAcids || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>wielonienasycone kwasy tłuszczowe omega-3: </h2>
          <p>{pollyunsaturatedFattyAcidsOmega3 || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>wielonienasycone kwasy tłuszczowe omega-6: </h2>
          <p>{pollyunsaturatedFattyAcidsOmega6 || "-"}</p>
        </Styled.ProductItem>
        <Styled.ProductItem>
          <h2>jednonienasycone kwasy tłuszczowe: </h2>
          <p>{monounsaturatedFattyAcids || "-"}</p>
        </Styled.ProductItem>
      </Styled.ProductItemsWrapper>
    </Styled.ProductStepWrapper>
  );
};

export default FattyAcids;
