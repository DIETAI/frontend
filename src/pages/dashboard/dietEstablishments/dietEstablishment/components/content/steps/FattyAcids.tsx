import React from "react";
import * as StepStyled from "../DietEstablishmentContent.styles";
import { IProductData } from "interfaces/product.interfaces";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import { AnimatePresence } from "framer-motion";

//icons
import { FaTint } from "icons/icons";

//components
import LoadingGrid from "../../loading/LoadingGrid";
import { getDietEstablishmentQuery } from "services/useDietEstablishments";

const FattyAcids = () => {
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
          <FaTint />
        </StepStyled.IconWrapper>
        <h2>Kwasy tłuszczowe</h2>
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
                <h2>nasycone kwasy tłuszczowe: </h2>
                <p>{dietEstablishmentQuery.saturatedFattyAcids || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>wielonienasycone kwasy tłuszczowe: </h2>
                <p>
                  {dietEstablishmentQuery.pollyunsaturatedFattyAcids || "-"}
                </p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>wielonienasycone kwasy tłuszczowe omega-3: </h2>
                <p>
                  {dietEstablishmentQuery.pollyunsaturatedFattyAcidsOmega3 ||
                    "-"}
                </p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>wielonienasycone kwasy tłuszczowe omega-6: </h2>
                <p>
                  {dietEstablishmentQuery.pollyunsaturatedFattyAcidsOmega6 ||
                    "-"}
                </p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>jednonienasycone kwasy tłuszczowe: </h2>
                <p>{dietEstablishmentQuery.monounsaturatedFattyAcids || "-"}</p>
              </StepStyled.DietEstablishmentItem>
            </StepStyled.DietEstablishmentItemsWrapper>
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default FattyAcids;
