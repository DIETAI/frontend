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
import { getDietEstablishment } from "services/getDietEstablishments";

const Vitamins = () => {
  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;
  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = getDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentError) return <div>Diet establishment error</div>;

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
          {dietEstablishmentLoading && (
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
        {dietEstablishment && (
          <StepStyled.DietEstablishmentStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <StepStyled.DietEstablishmentItemsWrapper>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina A ({dietEstablishment.vitaminA?.unit}): </h2>
                <p>{dietEstablishment.vitaminA?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              {/* <StepStyled.DietEstablishmentItem>
                <h2>witamina B1 (tiamina) ({dietEstablishment.vitaminB1?.unit}): </h2>
                <p>{dietEstablishment.vitaminB1?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem> */}
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B2 (ryboflawina) ({dietEstablishment.vitaminB2?.unit}
                  ):{" "}
                </h2>
                <p>{dietEstablishment.vitaminB2?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B3 (niacyna) ({dietEstablishment.vitaminPP?.unit}):{" "}
                </h2>
                <p>{dietEstablishment.vitaminPP?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B5 (kwas pantotenowy) (
                  {dietEstablishment.vitaminB5?.unit}):{" "}
                </h2>
                <p>{dietEstablishment.vitaminB5?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B6 (pirydoksyna) ({dietEstablishment.vitaminB6?.unit}
                  ):{" "}
                </h2>
                <p>{dietEstablishment.vitaminB6?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B7 (biotyna) ({dietEstablishment.biotin?.unit}):{" "}
                </h2>
                <p>{dietEstablishment.biotin?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B9 (kwas foliowy) (
                  {dietEstablishment.folicAcid?.unit}):{" "}
                </h2>
                <p>{dietEstablishment.folicAcid?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>
                  witamina B12 (kobalamina) (
                  {dietEstablishment.vitaminB12?.unit}):{" "}
                </h2>
                <p>{dietEstablishment.vitaminB12?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina C ({dietEstablishment.vitaminC?.unit}): </h2>
                <p>{dietEstablishment.vitaminC?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina D ({dietEstablishment.vitaminD?.unit}): </h2>
                <p>{dietEstablishment.vitaminD?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina E ({dietEstablishment.vitaminE?.unit}): </h2>
                <p>{dietEstablishment.vitaminE?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>witamina K ({dietEstablishment.vitaminK?.unit}): </h2>
                <p>{dietEstablishment.vitaminK?.amount || "-"}</p>
              </StepStyled.DietEstablishmentItem>
            </StepStyled.DietEstablishmentItemsWrapper>
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default Vitamins;
