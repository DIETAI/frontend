import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import EstablishmentImg from "assets/establishment.svg";
import { getClient } from "services/getClients";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import measurementImg from "assets/noMeasurement.svg";

//styles
import * as StepStyled from "../../MeasurementContent.styles";
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
import { getMeasurementQuery, useMeasurement } from "services/useMeasurements";

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
  const { measurementId } = useParams();
  console.log({ measurementId });

  if (!measurementId) return <div>not found</div>;
  const { measurementQuery, measurementQueryError, measurementQueryLoading } =
    getMeasurementQuery(measurementId);

  console.log({ measurementQuery });

  if (!measurementQuery)
    return (
      <StepStyled.MeasurementStepWrapper>
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
      </StepStyled.MeasurementStepWrapper>
    );

  return (
    <StepStyled.MeasurementStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaInfoCircle />
        </StepStyled.IconWrapper>
        <h2>Podstawowe informacje</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.MeasurementStepContentContainer>
        <AnimatePresence>
          {measurementQueryLoading && (
            <StepStyled.MeasurementLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.MeasurementLoadingWrapper>
          )}
        </AnimatePresence>
        {measurementQuery && (
          <StepStyled.MeasurementStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Styled.MeasurementInfoWrapper>
              <Styled.MeasurementInfoImageWrapper>
                <img className="backgroundImg" src={LogoBackground} />

                <img className="measurementImg" src={measurementImg} />
              </Styled.MeasurementInfoImageWrapper>

              <Styled.MeasurementInfoDescriptionWrapper>
                <h2>{measurementQuery.name}</h2>
              </Styled.MeasurementInfoDescriptionWrapper>

              <StepStyled.MeasurementItemsWrapper>
                <StepStyled.MeasurementItem>
                  <h2>data pomiaru: </h2>
                  <p>
                    {format(new Date(measurementQuery.date), "dd.MM.yyyy", {
                      locale: pl,
                    })}
                  </p>
                </StepStyled.MeasurementItem>
                <StepStyled.MeasurementItem>
                  <h2>pacjent: </h2>
                  <p>
                    {measurementQuery.patient.name +
                      " " +
                      measurementQuery.patient.lastName}
                  </p>
                </StepStyled.MeasurementItem>
                <StepStyled.MeasurementItem>
                  <h2>notatki: </h2>
                  <p>{measurementQuery.notes || "-"}</p>
                </StepStyled.MeasurementItem>

                {measurementQuery.imagesArr &&
                  measurementQuery.imagesArr.length > 0 && (
                    <Styled.MeasurementInfoDescriptionItem>
                      <Styled.MeasurementInfoDescriptionNavItem>
                        zdjęcia sylwetki
                      </Styled.MeasurementInfoDescriptionNavItem>
                      <Styled.GalleryWrapper>
                        {measurementQuery.imagesArr.map((galleryImage) => (
                          <Styled.GalleryImage
                            key={galleryImage._id}
                            src={galleryImage.imageURL}
                          />
                        ))}
                      </Styled.GalleryWrapper>
                    </Styled.MeasurementInfoDescriptionItem>
                  )}
              </StepStyled.MeasurementItemsWrapper>
            </Styled.MeasurementInfoWrapper>
          </StepStyled.MeasurementStepContentWrapper>
        )}
      </StepStyled.MeasurementStepContentContainer>
    </StepStyled.MeasurementStepWrapper>
  );
};

export default BasicInfo;