import React from "react";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";
import NoImage from "assets/noImage.svg";

//styles
import * as StepStyled from "../../ProductContent.styles";
import * as Styled from "./BasicInfo.styles";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle } from "icons/icons";

import AppleGif from "assets/apple.gif";
import LogoBackground from "assets/logo-icon.svg";

import { IProductData } from "interfaces/product.interfaces";

// interface IProductInfo {
//   name: IProductData["name"];
//   imageURL: IProductData["imageURL"];
//   gallery: IProductData["gallery"];
//   kcal: IProductData["kcal"];
//   protein: IProductData["protein"];
//   fat: IProductData["fat"];
//   carbohydrates: IProductData["carbohydrates"];
//   fiber: IProductData["fiber"];
// }

const BasicInfo = () => {
  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productError)
    return (
      <StepStyled.ProductStepWrapper>
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaInfoCircle />
          </StepStyled.IconWrapper>
          <h2>Podstawowe informacje</h2>
        </StepStyled.StepHeadingWrapper>
        <StepStyled.ErrorWrapper>
          <FaExclamationCircle />
          <h3>Brak danych</h3>
        </StepStyled.ErrorWrapper>
      </StepStyled.ProductStepWrapper>
    );

  // return (
  //   <StepStyled.ProductStepWrapper>
  //     <StepStyled.StepHeadingWrapper>
  //       <StepStyled.IconWrapper>
  //         <FaInfoCircle />
  //       </StepStyled.IconWrapper>
  //       <h2>Podstawowe informacje</h2>
  //     </StepStyled.StepHeadingWrapper>
  //     <StepStyled.ProductStepContentContainer>
  //       <StepStyled.ProductLoadingWrapper
  //         initial={{ opacity: 1 }}
  //         animate={{ opacity: 1 }}
  //         exit={{ opacity: 0 }}
  //         transition={{ duration: 0.3 }}
  //       >
  //         <LoadingGrid rows={4} />
  //       </StepStyled.ProductLoadingWrapper>
  //     </StepStyled.ProductStepContentContainer>
  //   </StepStyled.ProductStepWrapper>
  // );

  return (
    <StepStyled.ProductStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaInfoCircle />
        </StepStyled.IconWrapper>
        <h2>Podstawowe informacje</h2>
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
            <Styled.ProductInfoWrapper>
              <Styled.ProductInfoImageWrapper>
                <img className="backgroundImg" src={LogoBackground} />

                <img className="productImg" src={product.imageURL || NoImage} />
              </Styled.ProductInfoImageWrapper>
              <Styled.ProductInfoDescriptionWrapper>
                <h2>{product.name}</h2>

                <Styled.ProductInfoMacroWrapper>
                  <li>
                    kcal: <b>{product.kcal}</b>
                  </li>
                  <li>
                    B: <b>{product.protein.gram}</b>
                  </li>
                  <li>
                    T: <b>{product.fat.gram}</b>
                  </li>
                  <li>
                    W: <b>{product.carbohydrates.gram}</b>
                  </li>
                  <li>
                    Bł: <b>{product.fiber.gram}</b>
                  </li>
                </Styled.ProductInfoMacroWrapper>
                {/* <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}
              </Styled.ProductInfoDescriptionWrapper>
            </Styled.ProductInfoWrapper>
          </StepStyled.ProductStepContentWrapper>
        )}
      </StepStyled.ProductStepContentContainer>
    </StepStyled.ProductStepWrapper>
  );
};

export default BasicInfo;
