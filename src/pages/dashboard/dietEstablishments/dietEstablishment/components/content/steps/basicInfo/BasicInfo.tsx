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
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle } from "icons/icons";

import LogoBackground from "assets/logo-icon.svg";
import { IClientData } from "interfaces/client.interfaces";
import {
  getDietEstablishmentQuery,
  useDietEstablishment,
} from "services/useDietEstablishments";

const renderGender = (gender: IClientData["gender"]) => {
  if (gender === "female") {
    return "kobieta";
  }

  return "mężczyzna";
};

const renderClientPhysiologicalState = (
  physiologicalState: IClientData["physiologicalState"]
) => {
  if (physiologicalState === "lactation") {
    return "laktacja";
  }

  if (physiologicalState === "pregnancy") {
    return "ciąża";
  }
  return "brak";
};

const dateFormat = (date: Date) => {
  const formatDate = format(new Date(date), "dd.MM.yyyy", {
    locale: pl,
  });

  return formatDate;
};

const BasicInfo = () => {
  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;
  const {
    dietEstablishmentQuery,
    dietEstablishmentQueryError,
    dietEstablishmentQueryLoading,
  } = getDietEstablishmentQuery(dietEstablishmentId);

  console.log({ dietEstablishmentQuery });

  if (dietEstablishmentQueryError)
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
            <Styled.DietEstablishmentInfoWrapper>
              <Styled.DietEstablishmentInfoImageWrapper>
                <img className="backgroundImg" src={LogoBackground} />

                <img className="dietEstablishmentImg" src={EstablishmentImg} />
              </Styled.DietEstablishmentInfoImageWrapper>

              <Styled.DietEstablishmentInfoDescriptionWrapper>
                <h2>{dietEstablishmentQuery.name}</h2>
              </Styled.DietEstablishmentInfoDescriptionWrapper>

              <StepStyled.DietEstablishmentItemsWrapper>
                {dietEstablishmentQuery.description && (
                  <StepStyled.DietEstablishmentItem>
                    <h2>opis: </h2>
                    <p>{dietEstablishmentQuery.description}</p>
                  </StepStyled.DietEstablishmentItem>
                )}

                <StepStyled.DietEstablishmentItem>
                  <h2>pacjent: </h2>
                  <p>
                    {dietEstablishmentQuery.patientObj.name +
                      " " +
                      dietEstablishmentQuery.patientObj.lastName}
                  </p>
                </StepStyled.DietEstablishmentItem>

                {dietEstablishmentQuery.measurementObj && (
                  <StepStyled.DietEstablishmentItem>
                    <h2>pomiar: </h2>
                    <p>{dietEstablishmentQuery.measurementObj.name}</p>
                  </StepStyled.DietEstablishmentItem>
                )}
                <StepStyled.DietEstablishmentItem>
                  <h2>kcal: </h2>
                  <p>{dietEstablishmentQuery.kcal}</p>
                </StepStyled.DietEstablishmentItem>
                <StepStyled.DietEstablishmentItem>
                  <h2>rodzaj diety: </h2>
                  <p>{dietEstablishmentQuery.dietKindObj.name}</p>
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
