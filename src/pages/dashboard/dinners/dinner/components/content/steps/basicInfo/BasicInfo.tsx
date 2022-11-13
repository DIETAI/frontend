import React from "react";
import * as StepStyled from "../../DinnerContent.styles";
import * as Styled from "./BasicInfo.styles";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import { FaInfoCircle, FaExclamationCircle } from "icons/icons";

import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { getDinner } from "services/getDinners";

//assets
import LogoBackground from "assets/logo-icon.svg";
import NoImage from "assets/noImage.svg";

// interface IDinnerInfo {
//   name: IDinnerData["name"];
//   image: IDinnerData["image"];
//   gallery: IDinnerData["gallery"];
// }

const BasicInfo = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;
  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerError)
    return (
      <StepStyled.DinnerStepWrapper>
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
      </StepStyled.DinnerStepWrapper>
    );

  return (
    <StepStyled.DinnerStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaInfoCircle />
        </StepStyled.IconWrapper>
        <h2>Podstawowe informacje</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.DinnerStepContentContainer>
        <AnimatePresence>
          {dinnerLoading && (
            <StepStyled.DinnerLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </StepStyled.DinnerLoadingWrapper>
          )}
        </AnimatePresence>

        {dinner && (
          <StepStyled.DinnerStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Styled.DinnerInfoWrapper>
              <Styled.DinnerInfoImageWrapper>
                <img className="backgroundImg" src={LogoBackground} />

                <img
                  className="dinnerImg"
                  src={dinner.imageObj?.imageURL || NoImage}
                />
              </Styled.DinnerInfoImageWrapper>
              <Styled.DinnerInfoDescriptionWrapper>
                <h2>{dinner.name}</h2>
                {/* <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p> */}
              </Styled.DinnerInfoDescriptionWrapper>
            </Styled.DinnerInfoWrapper>
          </StepStyled.DinnerStepContentWrapper>
        )}
      </StepStyled.DinnerStepContentContainer>
    </StepStyled.DinnerStepWrapper>
  );
};

export default BasicInfo;
