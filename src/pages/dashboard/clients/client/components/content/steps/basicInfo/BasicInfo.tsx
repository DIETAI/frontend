import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import NoUser from "assets/noUser.svg";
import { getClient } from "services/getClients";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as StepStyled from "../../ClientContent.styles";
import * as Styled from "./BasicInfo.styles";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle } from "icons/icons";

import LogoBackground from "assets/logo-icon.svg";
import { IClientData } from "interfaces/client.interfaces";

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
  const { clientId } = useParams();
  console.log({ clientId });

  if (!clientId) return <div>not found</div>;
  const { client, clientError, clientLoading } = getClient(clientId);

  if (clientError)
    return (
      <StepStyled.ClientStepWrapper>
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
      </StepStyled.ClientStepWrapper>
    );

  return (
    <StepStyled.ClientStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaInfoCircle />
        </StepStyled.IconWrapper>
        <h2>Podstawowe informacje</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.ClientStepContentContainer>
        <AnimatePresence>
          {clientLoading && (
            <StepStyled.ClientLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.ClientLoadingWrapper>
          )}
        </AnimatePresence>
        {client && (
          <StepStyled.ClientStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Styled.ClientInfoWrapper>
              <Styled.ClientInfoImageWrapper>
                <img className="backgroundImg" src={LogoBackground} />

                <img className="clientImg" src={client.imageURL || NoUser} />
              </Styled.ClientInfoImageWrapper>
              <Styled.ClientInfoDescriptionWrapper>
                <h2>{client.name + " " + client.lastName}</h2>
              </Styled.ClientInfoDescriptionWrapper>

              <StepStyled.ClientItemsWrapper>
                <StepStyled.ClientItem>
                  <h2>data urodzenia: </h2>
                  <p>{dateFormat(client.dateOfBirth)}</p>
                </StepStyled.ClientItem>
                <StepStyled.ClientItem>
                  <h2>płeć: </h2>
                  <p>{renderGender(client.gender)}</p>
                </StepStyled.ClientItem>
                {client.gender === "female" && client.physiologicalState && (
                  <StepStyled.ClientItem>
                    <h2>stan fizjologiczny: </h2>
                    <p>
                      {renderClientPhysiologicalState(
                        client.physiologicalState
                      )}
                    </p>
                  </StepStyled.ClientItem>
                )}
                <StepStyled.ClientItem>
                  <h2>email: </h2>
                  <p>{client.email || "-"}</p>
                </StepStyled.ClientItem>
                <StepStyled.ClientItem>
                  <h2>numer telefonu: </h2>
                  <p>{client.phoneNumber || "-"}</p>
                </StepStyled.ClientItem>
                <StepStyled.ClientItem>
                  <h2>ulica: </h2>
                  <p>{client.street || "-"}</p>
                </StepStyled.ClientItem>
                <StepStyled.ClientItem>
                  <h2>kod pocztowy: </h2>
                  <p>{client.zipCode || "-"}</p>
                </StepStyled.ClientItem>
                <StepStyled.ClientItem>
                  <h2>miasto: </h2>
                  <p>{client.city || "-"}</p>
                </StepStyled.ClientItem>
                <StepStyled.ClientItem>
                  <h2>notatki: </h2>
                  <p>{client.notes || "-"}</p>
                </StepStyled.ClientItem>
              </StepStyled.ClientItemsWrapper>
            </Styled.ClientInfoWrapper>
          </StepStyled.ClientStepContentWrapper>
        )}
      </StepStyled.ClientStepContentContainer>
    </StepStyled.ClientStepWrapper>
  );
};

export default BasicInfo;
