import React from "react";
import * as StepStyled from "../DietEstablishmentContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaTh } from "icons/icons";

//components
import LoadingGrid from "../../loading/LoadingGrid";
import { getDietEstablishmentQuery } from "services/useDietEstablishments";

const Minerals = () => {
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
          <FaTh />
        </StepStyled.IconWrapper>
        <h2>Składniki mineralne</h2>
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
                <h2>cynk ({dietEstablishmentQuery.zinc?.unit}): </h2>
                <p>{dietEstablishmentQuery.zinc?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>fosfor ({dietEstablishmentQuery.phosphorus?.unit}): </h2>
                <p>{dietEstablishmentQuery.phosphorus?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>magnez ({dietEstablishmentQuery.magnesium?.unit}): </h2>
                <p>{dietEstablishmentQuery.magnesium?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>miedź ({dietEstablishmentQuery.copper?.unit}): </h2>
                <p>{dietEstablishmentQuery.copper?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>potas ({dietEstablishmentQuery.potassium?.unit}): </h2>
                <p>{dietEstablishmentQuery.potassium?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>selen ({dietEstablishmentQuery.selenium?.unit}): </h2>
                <p>{dietEstablishmentQuery.selenium?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>sód ({dietEstablishmentQuery.sodium?.unit}): </h2>
                <p>{dietEstablishmentQuery.sodium?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>wapń ({dietEstablishmentQuery.calcium?.unit}): </h2>
                <p>{dietEstablishmentQuery.calcium?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>żelazo ({dietEstablishmentQuery.iron?.unit}): </h2>
                <p>{dietEstablishmentQuery.iron?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
            </StepStyled.DietEstablishmentItemsWrapper>
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default Minerals;
