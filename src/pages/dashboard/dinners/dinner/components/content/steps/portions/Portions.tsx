import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";

//styles
import * as StepStyled from "../../DinnerContent.styles";
import * as Styled from "./Portions.styles";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle, FaCubes } from "icons/icons";

import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { getDinner } from "services/getDinners";

//assets
import LogoBackground from "assets/logo-icon.svg";
import NoImage from "assets/noImage.svg";
import { getDinnerProductsQuery } from "services/getDinnerProducts";
import NoDataImg from "assets/noData.svg";
import { getDinnerPortionsQuery } from "services/getDinnerPortions";

const Portions = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;
  const {
    dinnerPortionsQuery,
    dinnerPortionsErrorQuery,
    dinnerPortionsLoadingQuery,
  } = getDinnerPortionsQuery(dinnerId);

  if (dinnerPortionsErrorQuery)
    return (
      <StepStyled.DinnerStepWrapper>
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaInfoCircle />
          </StepStyled.IconWrapper>
          <h2>Zestawy porcji</h2>
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
          <FaCubes />
        </StepStyled.IconWrapper>
        <h2>Zestawy porcji</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.DinnerStepContentContainer>
        <AnimatePresence>
          {dinnerPortionsLoadingQuery && (
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

        {dinnerPortionsQuery && (
          <StepStyled.DinnerStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            {dinnerPortionsQuery.length < 1 && (
              <StepStyled.DinnerEmptyItemWrapper>
                <img src={NoDataImg} />
                <h2>Brak dodanych zestawów porcji</h2>
              </StepStyled.DinnerEmptyItemWrapper>
            )}
            {dinnerPortionsQuery.length > 1 && (
              <StepStyled.DinnerItemsWrapper>
                {dinnerPortionsQuery.map((dinnerPortion, index) => (
                  <Styled.FieldWrapper key={dinnerPortion._id}>
                    <Styled.FieldHeadWrapper>
                      <Styled.FieldNumberWrapper>
                        <p>{index + 1}</p>
                      </Styled.FieldNumberWrapper>

                      {dinnerPortion.type === "default" && (
                        <h2>domyślny zestaw</h2>
                      )}
                    </Styled.FieldHeadWrapper>

                    <Styled.PortionTotalWrapper>
                      <Styled.PortionTotalFeaturesWrapper>
                        <Styled.PortionTotalFeature>
                          Kcal: <b>{dinnerPortion.total.kcal}</b>
                        </Styled.PortionTotalFeature>
                        <Styled.PortionTotalFeature>
                          B (g): <b>{dinnerPortion.total.protein.gram}</b>
                        </Styled.PortionTotalFeature>
                        <Styled.PortionTotalFeature>
                          T (g): <b>{dinnerPortion.total.fat.gram}</b>
                        </Styled.PortionTotalFeature>
                        <Styled.PortionTotalFeature>
                          W (g): <b>{dinnerPortion.total.carbohydrates.gram}</b>
                        </Styled.PortionTotalFeature>
                        <Styled.PortionTotalFeature>
                          Wp (g):{" "}
                          <b>
                            {dinnerPortion.total.digestableCarbohydrates.gram}
                          </b>
                        </Styled.PortionTotalFeature>
                        <Styled.PortionTotalFeature>
                          Bł (g): <b>{dinnerPortion.total.fiber.gram}</b>
                        </Styled.PortionTotalFeature>
                      </Styled.PortionTotalFeaturesWrapper>
                    </Styled.PortionTotalWrapper>

                    <Styled.ProductsWrapper>
                      {dinnerPortion.dinnerProducts.map(
                        (dinnerPortionProduct) => (
                          <Styled.ProductWrapper
                            key={dinnerPortionProduct.dinnerProductId}
                          >
                            <Styled.ProductMainWrapper>
                              {dinnerPortionProduct.dinnerProduct.product
                                .image && (
                                <div>
                                  <Image
                                    roundedDataGrid={true}
                                    imageId={
                                      dinnerPortionProduct.dinnerProduct.product
                                        .image
                                    }
                                  />
                                </div>
                              )}

                              <Styled.ProductContentWrapper>
                                <h3>
                                  {
                                    dinnerPortionProduct.dinnerProduct.product
                                      .name
                                  }
                                </h3>
                              </Styled.ProductContentWrapper>
                            </Styled.ProductMainWrapper>

                            <Styled.ProductPortionItem>
                              {dinnerPortionProduct.portion} g
                            </Styled.ProductPortionItem>
                          </Styled.ProductWrapper>
                        )
                      )}
                    </Styled.ProductsWrapper>

                    {/* <Styled.FieldItemsWrapper>
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
                    </Styled.FieldItemsWrapper> */}
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

export default Portions;
