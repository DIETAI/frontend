import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";

//styles
import * as StepStyled from "../../DinnerContent.styles";
import * as Styled from "./Products.styles";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle, FaCarrot } from "icons/icons";

import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { getDinner } from "services/getDinners";

//assets
import LogoBackground from "assets/logo-icon.svg";
import NoImage from "assets/noImage.svg";
import { getDinnerProductsQuery } from "services/getDinnerProducts";
import NoDataImg from "assets/noData.svg";

const Products = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;
  const {
    dinnerProductsQuery,
    dinnerProductsErrorQuery,
    dinnerProductsLoadingQuery,
  } = getDinnerProductsQuery(dinnerId);

  if (dinnerProductsErrorQuery)
    return (
      <StepStyled.DinnerStepWrapper>
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaCarrot />
          </StepStyled.IconWrapper>
          <h2>Produkty</h2>
        </StepStyled.StepHeadingWrapper>
        <StepStyled.ErrorWrapper>
          <FaExclamationCircle />
          <h3>Brak danych</h3>
        </StepStyled.ErrorWrapper>
      </StepStyled.DinnerStepWrapper>
    );

  return (
    <StepStyled.DinnerStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaCarrot />
        </StepStyled.IconWrapper>
        <h2>Produkty</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.DinnerStepContentContainer>
        <AnimatePresence>
          {dinnerProductsLoadingQuery && (
            <StepStyled.DinnerLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.DinnerLoadingWrapper>
          )}
        </AnimatePresence>

        {dinnerProductsQuery && (
          <StepStyled.DinnerStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            {dinnerProductsQuery.length < 1 && (
              <StepStyled.DinnerEmptyItemWrapper>
                <img src={NoDataImg} />
                <h2>Brak dodanych produktów</h2>
              </StepStyled.DinnerEmptyItemWrapper>
            )}
            {dinnerProductsQuery.length > 1 && (
              <StepStyled.DinnerItemsWrapper>
                {dinnerProductsQuery.map((dinnerProduct, index) => (
                  <Styled.FieldWrapper key={dinnerProduct._id}>
                    <Styled.FieldHeadWrapper>
                      <Styled.FieldImageWrapper>
                        <img className="backgroundImg" src={LogoBackground} />

                        <img
                          className="productImg"
                          src={dinnerProduct.product.image?.imageURL || NoImage}
                        />
                      </Styled.FieldImageWrapper>
                      <h2>{dinnerProduct.product.name}</h2>
                    </Styled.FieldHeadWrapper>
                    <Styled.FieldItemsWrapper>
                      <StepStyled.DinnerItem>
                        <h2>domyślna ilość (g): </h2>
                        <p>{dinnerProduct.defaultAmount}</p>
                      </StepStyled.DinnerItem>
                      <StepStyled.DinnerItem>
                        <h2>minimalna ilość (g): </h2>
                        <p>{dinnerProduct.minAmount}</p>
                      </StepStyled.DinnerItem>
                      <StepStyled.DinnerItem>
                        <h2>maksymalna ilość (g): </h2>
                        <p>{dinnerProduct.maxAmount}</p>
                      </StepStyled.DinnerItem>
                    </Styled.FieldItemsWrapper>
                  </Styled.FieldWrapper>
                ))}
              </StepStyled.DinnerItemsWrapper>
            )}
          </StepStyled.DinnerStepContentWrapper>
        )}
      </StepStyled.DinnerStepContentContainer>
    </StepStyled.DinnerStepWrapper>
  );
};

export default Products;
