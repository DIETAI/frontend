import React from "react";
import * as StepStyled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaCubes } from "icons/icons";

//components
import LoadingGrid from "../../loading/LoadingGrid";

// interface IProductMacrohydrates {
//   protein: IProductData["protein"];
//   fat: IProductData["fat"];
//   carbohydrates: IProductData["carbohydrates"];
//   fiber: IProductData["fiber"];
//   digestibleCarbohydrates: IProductData["digestableCarbohydrates"];
//   carbohydrateExchangers: IProductData["carbohydrateExchangers"];
//   proteinFatExchangers: IProductData["proteinFatExchangers"];
// }

const Macrohydrates = () => {
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productError) return <div>Product error</div>;

  return (
    <StepStyled.ProductStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaCubes />
        </StepStyled.IconWrapper>
        <h2>Makroskładniki</h2>
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
                <h2>białka (g): </h2>
                <p>{product.protein.gram}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>tłuszcze (g): </h2>
                <p>{product.fat.gram}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>węglowodany (g): </h2>
                <p>{product.carbohydrates.gram}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>błonnik (g): </h2>
                <p>{product.fiber.gram}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>węglowodany przyswajalne (g): </h2>
                <p>{product.digestableCarbohydrates.gram}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>wymienniki węglowodanowe: </h2>
                <p>{product.carbohydrateExchangers}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>wymienniki białkowo-tłuszczowe: </h2>
                <p>{product.proteinFatExchangers}</p>
              </StepStyled.ProductItem>
            </StepStyled.ProductItemsWrapper>
          </StepStyled.ProductStepContentWrapper>
        )}
      </StepStyled.ProductStepContentContainer>
    </StepStyled.ProductStepWrapper>
  );
};

export default Macrohydrates;
