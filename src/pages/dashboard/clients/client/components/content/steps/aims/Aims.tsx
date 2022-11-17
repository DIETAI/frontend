import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import NoImage from "assets/noImage.svg";
import { getClient } from "services/getClients";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import { aimsOptions } from "pages/dashboard/clients/components/form/steps/aims/Aims";

//styles
import * as StepStyled from "../../ClientContent.styles";
import * as Styled from "./Aims.styles";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle, FaWeight } from "icons/icons";

import LogoBackground from "assets/logo-icon.svg";
import { IClientData } from "interfaces/client.interfaces";

const dateFormat = (date: Date) => {
  const formatDate = format(new Date(date), "dd.MM.yyyy", {
    locale: pl,
  });

  return formatDate;
};

const renderSpecificAim = (specificAim: string) => {
  const specificAimObj = aimsOptions.find(
    (option) => specificAim === option.type
  );

  return specificAimObj?.name;
};

const Aims = () => {
  const { clientId } = useParams();
  console.log({ clientId });

  if (!clientId) return <div>not found</div>;
  const { client, clientError, clientLoading } = getClient(clientId);

  if (clientError)
    return (
      <StepStyled.ClientStepWrapper>
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaWeight />
          </StepStyled.IconWrapper>
          <h2>Cele</h2>
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
          <FaWeight />
        </StepStyled.IconWrapper>
        <h2>Cele</h2>
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
            <StepStyled.ClientItem>
              <h2>oczekiwana masa ciała (kg): </h2>
              <p>{client.expectedBodyWeight || "-"}</p>
            </StepStyled.ClientItem>

            <Styled.ClientListItem>
              <Styled.ClientListNavItem>
                cele szczegółowe
              </Styled.ClientListNavItem>

              {client.specificAims && client.specificAims.length > 0 ? (
                client.specificAims.map((specificAim) => (
                  <li key={specificAim}> {renderSpecificAim(specificAim)}</li>
                ))
              ) : (
                <p>brak</p>
              )}
            </Styled.ClientListItem>
          </StepStyled.ClientStepContentWrapper>
        )}
      </StepStyled.ClientStepContentContainer>
    </StepStyled.ClientStepWrapper>
  );
};

export default Aims;
