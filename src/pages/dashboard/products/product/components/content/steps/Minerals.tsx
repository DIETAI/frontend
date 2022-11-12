import React from "react";
import * as StepStyled from "../ProductContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaTh } from "icons/icons";

//components
import LoadingGrid from "../../loading/LoadingGrid";

// interface IProductMinerals {
//   zinc: IProductData["zinc"];
//   phosphorus: IProductData["phosphorus"];
//   magnesium: IProductData["magnesium"];
//   copper: IProductData["copper"];
//   potassium: IProductData["potassium"];
//   selenium: IProductData["selenium"];
//   sodium: IProductData["sodium"];
//   calcium: IProductData["calcium"];
//   iron: IProductData["iron"];
// }

const Minerals = () => {
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productError) return <div>Product error</div>;

  return (
    <StepStyled.ProductStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaTh />
        </StepStyled.IconWrapper>
        <h2>Składniki mineralne</h2>
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
                <h2>cynk ({product.zinc?.unit}): </h2>
                <p>{product.zinc?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>fosfor ({product.phosphorus?.unit}): </h2>
                <p>{product.phosphorus?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>magnez ({product.magnesium?.unit}): </h2>
                <p>{product.magnesium?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>miedź ({product.copper?.unit}): </h2>
                <p>{product.copper?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>potas ({product.potassium?.unit}): </h2>
                <p>{product.potassium?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>selen ({product.selenium?.unit}): </h2>
                <p>{product.selenium?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>sód ({product.sodium?.unit}): </h2>
                <p>{product.sodium?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>wapń ({product.calcium?.unit}): </h2>
                <p>{product.calcium?.amount || "-"}</p>
              </StepStyled.ProductItem>
              <StepStyled.ProductItem>
                <h2>żelazo ({product.iron?.unit}): </h2>
                <p>{product.iron?.amount || "-"}</p>
              </StepStyled.ProductItem>
            </StepStyled.ProductItemsWrapper>
          </StepStyled.ProductStepContentWrapper>
        )}
      </StepStyled.ProductStepContentContainer>
    </StepStyled.ProductStepWrapper>
  );
};

export default Minerals;
