import React from "react";
import * as StepStyled from "../DietEstablishmentContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaGripHorizontal } from "icons/icons";

//components
import LoadingGrid from "../../loading/LoadingGrid";
import { getDietEstablishmentQuery } from "services/useDietEstablishments";

const Vitamins = () => {
  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;
  const {
    dietEstablishmentQuery,
    dietEstablishmentQueryError,
    dietEstablishmentQueryLoading,
  } = getDietEstablishmentQuery(dietEstablishmentId);

  if (dietEstablishmentQueryError) return <div>Diet establishment error</div>;

  return (
    <StepStyled.DietEstablishmentStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaGripHorizontal />
        </StepStyled.IconWrapper>
        <h2>Witaminy</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.DietEstablishmentStepContentContainer>
        <AnimatePresence>
          {dietEstablishmentQueryLoading && (
            <StepStyled.DietEstablishmentLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.DietEstablishmentLoadingWrapper>
          )}
        </AnimatePresence>
        {dietEstablishmentQuery && (
          <StepStyled.DietEstablishmentStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <StepStyled.DietEstablishmentItemsWrapper>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina A ({dietEstablishmentQuery.vitaminA?.unit}): </h2>
                <p>{dietEstablishmentQuery.vitaminA?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              {/* <StepStyled.DietEstablishmentItem>
                <h2>witamina B1 (tiamina) ({dietEstablishmentQuery.vitaminB1?.unit}): </h2>
                <p>{dietEstablishmentQuery.vitaminB1?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem> */}
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B2 (ryboflawina) (
                  {dietEstablishmentQuery.vitaminB2?.unit}):{" "}
                </h2>
                <p>{dietEstablishmentQuery.vitaminB2?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B3 (niacyna) (
                  {dietEstablishmentQuery.vitaminPP?.unit}):{" "}
                </h2>
                <p>{dietEstablishmentQuery.vitaminPP?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B5 (kwas pantotenowy) (
                  {dietEstablishmentQuery.vitaminB5?.unit}):{" "}
                </h2>
                <p>{dietEstablishmentQuery.vitaminB5?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B6 (pirydoksyna) (
                  {dietEstablishmentQuery.vitaminB6?.unit}):{" "}
                </h2>
                <p>{dietEstablishmentQuery.vitaminB6?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B7 (biotyna) ({dietEstablishmentQuery.biotin?.unit}):{" "}
                </h2>
                <p>{dietEstablishmentQuery.biotin?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B9 (kwas foliowy) (
                  {dietEstablishmentQuery.folicAcid?.unit}):{" "}
                </h2>
                <p>{dietEstablishmentQuery.folicAcid?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B12 (kobalamina) (
                  {dietEstablishmentQuery.vitaminB12?.unit}):{" "}
                </h2>
                <p>{dietEstablishmentQuery.vitaminB12?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina C ({dietEstablishmentQuery.vitaminC?.unit}): </h2>
                <p>{dietEstablishmentQuery.vitaminC?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina D ({dietEstablishmentQuery.vitaminD?.unit}): </h2>
                <p>{dietEstablishmentQuery.vitaminD?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina E ({dietEstablishmentQuery.vitaminE?.unit}): </h2>
                <p>{dietEstablishmentQuery.vitaminE?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina K ({dietEstablishmentQuery.vitaminK?.unit}): </h2>
                <p>{dietEstablishmentQuery.vitaminK?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
            </StepStyled.DietEstablishmentItemsWrapper>
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default Vitamins;
