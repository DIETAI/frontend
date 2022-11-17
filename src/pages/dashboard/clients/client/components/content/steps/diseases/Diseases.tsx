import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import NoImage from "assets/noImage.svg";
import { getClient } from "services/getClients";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import {
  diseasesOptions,
  alergensOptions,
} from "pages/dashboard/clients/components/form/steps/diseases/Diseases";

//styles
import * as StepStyled from "../../ClientContent.styles";
import * as Styled from "./Diseases.styles";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle, FaDisease } from "icons/icons";

import LogoBackground from "assets/logo-icon.svg";
import { IClientData } from "interfaces/client.interfaces";

const alergens = ["peanuts", "rye", "eggProtein"];

const dateFormat = (date: Date) => {
  const formatDate = format(new Date(date), "dd.MM.yyyy", {
    locale: pl,
  });

  return formatDate;
};

const renderAlergen = (alergen: string) => {
  const alergenObj = alergensOptions.find((option) => alergen === option.type);

  return alergenObj?.name;
};

const renderDisease = (disease: string) => {
  const diseaseObj = diseasesOptions.find((option) => disease === option.type);

  return diseaseObj?.name;
};

const Diseases = () => {
  const { clientId } = useParams();
  console.log({ clientId });

  if (!clientId) return <div>not found</div>;
  const { client, clientError, clientLoading } = getClient(clientId);

  if (clientError)
    return (
      <StepStyled.ClientStepWrapper>
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaDisease />
          </StepStyled.IconWrapper>
          <h2>Choroby i alergie</h2>
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
          <FaDisease />
        </StepStyled.IconWrapper>
        <h2>Choroby i alergie</h2>
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
            <Styled.ClientListItem>
              <Styled.ClientListNavItem>choroby</Styled.ClientListNavItem>

              {client.diseases && client.diseases.length > 0 ? (
                client.diseases.map((disease) => (
                  <li key={disease}> {renderDisease(disease)}</li>
                ))
              ) : (
                <p>brak</p>
              )}
            </Styled.ClientListItem>

            <Styled.ClientListItem>
              <Styled.ClientListNavItem>alergie</Styled.ClientListNavItem>

              {client.alergens && client.alergens.length > 0 ? (
                client.alergens.map((alergen) => (
                  <li key={alergen}> {renderAlergen(alergen)}</li>
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

export default Diseases;
