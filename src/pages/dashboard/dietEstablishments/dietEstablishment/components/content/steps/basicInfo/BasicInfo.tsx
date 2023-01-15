import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import EstablishmentImg from "assets/establishment.svg";
import { getClient } from "services/getClients";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as StepStyled from "../../DietEstablishmentContent.styles";
import * as Styled from "./BasicInfo.styles";

//components
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle } from "icons/icons";

import LogoBackground from "assets/logo-icon.svg";

import { getDietEstablishment } from "services/getDietEstablishments";

const BasicInfo = () => {
  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;
  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = getDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentError)
    return (
      <StepStyled.DietEstablishmentStepWrapper>
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
      </StepStyled.DietEstablishmentStepWrapper>
    );

  return (
    <StepStyled.DietEstablishmentStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaInfoCircle />
        </StepStyled.IconWrapper>
        <h2>Podstawowe informacje</h2>
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
            <Styled.DietEstablishmentInfoWrapper>
              <Styled.DietEstablishmentInfoImageWrapper>
                <img className="backgroundImg" src={LogoBackground} />

                <img className="dietEstablishmentImg" src={EstablishmentImg} />
              </Styled.DietEstablishmentInfoImageWrapper>

              <Styled.DietEstablishmentInfoDescriptionWrapper>
                <h2>{dietEstablishment.name}</h2>
              </Styled.DietEstablishmentInfoDescriptionWrapper>

              <StepStyled.DietEstablishmentItemsWrapper>
                {dietEstablishment.description && (
                  <StepStyled.DietEstablishmentItem>
                    <h2>opis: </h2>
                    <p>{dietEstablishment.description}</p>
                  </StepStyled.DietEstablishmentItem>
                )}

                <StepStyled.DietEstablishmentItem>
                  <h2>pacjent: </h2>
                  <p>
                    {dietEstablishment.client.name +
                      " " +
                      dietEstablishment.client.lastName}
                  </p>
                </StepStyled.DietEstablishmentItem>

                {dietEstablishment.measurementId && (
                  <StepStyled.DietEstablishmentItem>
                    <h2>pomiar: </h2>
                    <p>{dietEstablishment.measurementId.name}</p>
                  </StepStyled.DietEstablishmentItem>
                )}
                <StepStyled.DietEstablishmentItem>
                  <h2>kcal: </h2>
                  <p>{dietEstablishment.kcal}</p>
                </StepStyled.DietEstablishmentItem>
                <StepStyled.DietEstablishmentItem>
                  <h2>rodzaj diety: </h2>
                  <p>{dietEstablishment.dietKind?.name}</p>
                </StepStyled.DietEstablishmentItem>
              </StepStyled.DietEstablishmentItemsWrapper>
            </Styled.DietEstablishmentInfoWrapper>
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default BasicInfo;
