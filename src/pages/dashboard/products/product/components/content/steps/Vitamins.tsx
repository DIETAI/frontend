import React from "react";
import * as StepStyled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaGripHorizontal } from "icons/icons";

//components
import LoadingGrid from "../../loading/LoadingGrid";

// interface IProductVitamins {
//   vitaminA: IProductData["vitaminA"];
//   vitaminB1: IProductData["vitaminB1"];
//   vitaminB2: IProductData["vitaminB2"];
//   vitaminPP: IProductData["vitaminPP"];
//   vitaminB5: IProductData["vitaminB5"];
//   vitaminB6: IProductData["vitaminB6"];
//   biotin: IProductData["biotin"];
//   folicAcid: IProductData["folicAcid"];
//   vitaminB12: IProductData["vitaminB12"];
//   vitaminC: IProductData["vitaminC"];
//   vitaminD: IProductData["vitaminD"];
//   vitaminE: IProductData["vitaminE"];
//   vitaminK: IProductData["vitaminK"];
// }

const Vitamins = () => {
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productError) return <div>Product error</div>;

  return (
    <StepStyled.ProductStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaGripHorizontal />
        </StepStyled.IconWrapper>
        <h2>Witaminy</h2>
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
            <StepStyled.ProductItemsWrapper>
              <StepStyled.ProductItem>
                <h2>witamina A ({product.vitaminA?.unit}): </h2>
                <p>{product.vitaminA?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina B1 (tiamina) ({product.vitaminB1?.unit}): </h2>
                <p>{product.vitaminB1?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina B2 (ryboflawina) ({product.vitaminB2?.unit}): </h2>
                <p>{product.vitaminB2?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina B3 (niacyna) ({product.vitaminPP?.unit}): </h2>
                <p>{product.vitaminPP?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>
                  witamina B5 (kwas pantotenowy) ({product.vitaminB5?.unit}):{" "}
                </h2>
                <p>{product.vitaminB5?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina B6 (pirydoksyna) ({product.vitaminB6?.unit}): </h2>
                <p>{product.vitaminB6?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina B7 (biotyna) ({product.biotin?.unit}): </h2>
                <p>{product.biotin?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>
                  witamina B9 (kwas foliowy) ({product.folicAcid?.unit}):{" "}
                </h2>
                <p>{product.folicAcid?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>
                  witamina B12 (kobalamina) ({product.vitaminB12?.unit}):{" "}
                </h2>
                <p>{product.vitaminB12?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina C ({product.vitaminC?.unit}): </h2>
                <p>{product.vitaminC?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina D ({product.vitaminD?.unit}): </h2>
                <p>{product.vitaminD?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina E ({product.vitaminE?.unit}): </h2>
                <p>{product.vitaminE?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>witamina K ({product.vitaminK?.unit}): </h2>
                <p>{product.vitaminK?.amount || "-"}</p>
              </StepStyled.ProductItem>
            </StepStyled.ProductItemsWrapper>
          </StepStyled.ProductStepContentWrapper>
        )}
      </StepStyled.ProductStepContentContainer>
    </StepStyled.ProductStepWrapper>
  );
};

export default Vitamins;
