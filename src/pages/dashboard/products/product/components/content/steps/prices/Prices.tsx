import React from "react";
import { useTranslation } from "react-i18next";
import { IProductData } from "interfaces/product.interfaces";

//styles
import * as Styled from "./Prices.styles";
import * as StepStyled from "../../ProductContent.styles";

//icons
import { FaDollarSign } from "icons/icons";

//assets
import NoDataImg from "assets/noData.svg";

interface IProductPrices {
  prices: IProductData["prices"];
}

const pricesTest = [
  { shop: "sklep 1", price: 20, currency: "PLN" },
  { shop: "sklep 2", price: 30, currency: "PLN" },
];

const Prices = ({ prices }: IProductPrices) => {
  const { t } = useTranslation();

  return (
    <>
      <StepStyled.ProductStepWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
      >
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaDollarSign />
          </StepStyled.IconWrapper>
          <h2>Ceny</h2>
        </StepStyled.StepHeadingWrapper>
        {prices.length < 1 && (
          <StepStyled.ProductEmptyItemWrapper>
            <img src={NoDataImg} />
            <h2>Brak dodanych cen</h2>
          </StepStyled.ProductEmptyItemWrapper>
        )}
        {prices.length > 1 && (
          <StepStyled.ProductItemsWrapper>
            {prices.map((price, index) => (
              <Styled.FieldWrapper key={index + 1}>
                <Styled.FieldHeadWrapper>
                  <Styled.FieldNumberWrapper>
                    <p>{index + 1}</p>
                  </Styled.FieldNumberWrapper>
                </Styled.FieldHeadWrapper>
                <StepStyled.ProductItem>
                  <h2>sklep: </h2>
                  <p>{price.shop}</p>
                </StepStyled.ProductItem>
                <StepStyled.ProductItem>
                  <h2>cena: </h2>
                  <p>{price.price}</p>
                </StepStyled.ProductItem>
                <StepStyled.ProductItem>
                  <h2>waluta: </h2>
                  <p>{price.currency}</p>
                </StepStyled.ProductItem>
              </Styled.FieldWrapper>
            ))}
          </StepStyled.ProductItemsWrapper>
        )}
      </StepStyled.ProductStepWrapper>
    </>
  );
};

export default Prices;
