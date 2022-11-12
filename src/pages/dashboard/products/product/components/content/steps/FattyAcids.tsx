import React from "react";
import * as StepStyled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaTint } from "icons/icons";

//components
import LoadingGrid from "../../loading/LoadingGrid";

// interface IProductFattyAcids {
//   saturatedFattyAcids: IProductData["saturatedFattyAcids"];
//   pollyunsaturatedFattyAcids: IProductData["pollyunsaturatedFattyAcids"];
//   pollyunsaturatedFattyAcidsOmega3: IProductData["pollyunsaturatedFattyAcidsOmega3"];
//   pollyunsaturatedFattyAcidsOmega6: IProductData["pollyunsaturatedFattyAcidsOmega6"];
//   monounsaturatedFattyAcids: IProductData["monounsaturatedFattyAcids"];
// }

const FattyAcids = () => {
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productError) return <div>Product error</div>;

  return (
    <StepStyled.ProductStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaTint />
        </StepStyled.IconWrapper>
        <h2>Kwasy tłuszczowe</h2>
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
                <h2>nasycone kwasy tłuszczowe: </h2>
                <p>{product.saturatedFattyAcids || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>wielonienasycone kwasy tłuszczowe: </h2>
                <p>{product.pollyunsaturatedFattyAcids || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>wielonienasycone kwasy tłuszczowe omega-3: </h2>
                <p>{product.pollyunsaturatedFattyAcidsOmega3 || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>wielonienasycone kwasy tłuszczowe omega-6: </h2>
                <p>{product.pollyunsaturatedFattyAcidsOmega6 || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>jednonienasycone kwasy tłuszczowe: </h2>
                <p>{product.monounsaturatedFattyAcids || "-"}</p>
              </StepStyled.ProductItem>
            </StepStyled.ProductItemsWrapper>
          </StepStyled.ProductStepContentWrapper>
        )}
      </StepStyled.ProductStepContentContainer>
    </StepStyled.ProductStepWrapper>
  );
};

export default FattyAcids;
