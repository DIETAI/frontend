import React from "react";
import { useTranslation } from "react-i18next";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//styles
import * as Styled from "./Prices.styles";
import * as StepStyled from "../../ProductContent.styles";

//icons
import { FaDollarSign } from "icons/icons";

//assets
import NoDataImg from "assets/noData.svg";

//components
import LoadingGrid from "../../../loading/LoadingGrid";

// interface IProductPrices {
//   prices: IProductData["prices"];
// }

const pricesTest = [
  { shop: "sklep 1", price: 20, currency: "PLN" },
  { shop: "sklep 2", price: 30, currency: "PLN" },
];

const Prices = () => {
  const { t } = useTranslation();

  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productError) return <div>Product error</div>;

  return (
    <StepStyled.ProductStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaDollarSign />
        </StepStyled.IconWrapper>
        <h2>Ceny</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.ProductStepContentContainer>
        <AnimatePresence>
          {productLoading && (
            <StepStyled.ProductLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.ProductLoadingWrapper>
          )}
        </AnimatePresence>
        {product && (
          <StepStyled.ProductStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            {product.prices.length < 1 && (
              <StepStyled.ProductEmptyItemWrapper>
                <img src={NoDataImg} />
                <h2>Brak dodanych cen</h2>
              </StepStyled.ProductEmptyItemWrapper>
            )}
            {product.prices.length > 1 && (
              <StepStyled.ProductItemsWrapper>
                {product.prices.map((price, index) => (
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
          </StepStyled.ProductStepContentWrapper>
        )}
      </StepStyled.ProductStepContentContainer>
    </StepStyled.ProductStepWrapper>
  );
};

export default Prices;
