import React from "react";
import * as StepStyled from "../../DinnerContent.styles";
import * as Styled from "./BasicInfo.styles";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import {
  mealTypeOptions,
  mealTypeKindOptions,
  preparationTimeOptions,
  tagOptions,
} from "pages/dashboard/dinners/components/form/steps/BasicInfo";

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

const renderDinnerPreparationTime = (preparationTime: string) => {
  const preparationTimeObj = preparationTimeOptions.find(
    (option) => preparationTime === option.type
  );

  return preparationTimeObj?.name;
};

const renderDinnerMealType = (mealType: string) => {
  const mealTypeObj = mealTypeOptions.find(
    (option) => mealType === option.type
  );

  return mealTypeObj?.name;
};

const renderDinnerMealTypeKind = (mealTypeKind: string) => {
  const mealTypeKindObj = mealTypeKindOptions.find(
    (option) => mealTypeKind === option.type
  );

  return mealTypeKindObj?.name;
};

const renderDinnerTag = (tag: string) => {
  const mealTagObj = tagOptions.find((option) => tag === option.type);

  return mealTagObj?.name;
};

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
                <Styled.DinnerInfoDescriptionItem>
                  <h2>{dinner.name}</h2>
                </Styled.DinnerInfoDescriptionItem>

                {dinner.description && (
                  <Styled.DinnerInfoDescriptionItem>
                    <Styled.DinnerInfoDescriptionNavItem>
                      opis
                    </Styled.DinnerInfoDescriptionNavItem>
                    <p>{dinner.description}</p>
                  </Styled.DinnerInfoDescriptionItem>
                )}

                {dinner.recipe && (
                  <Styled.DinnerInfoDescriptionItem>
                    <Styled.DinnerInfoDescriptionNavItem>
                      przepis
                    </Styled.DinnerInfoDescriptionNavItem>
                    <p>{dinner.recipe}</p>
                  </Styled.DinnerInfoDescriptionItem>
                )}

                {dinner.preparation_time && (
                  <Styled.DinnerInfoDescriptionItem>
                    <Styled.DinnerInfoDescriptionNavItem>
                      czas przygotowania
                    </Styled.DinnerInfoDescriptionNavItem>
                    <p>
                      {renderDinnerPreparationTime(dinner.preparation_time)}
                    </p>
                  </Styled.DinnerInfoDescriptionItem>
                )}

                {dinner.mealTypes.length > 0 && (
                  <Styled.DinnerInfoDescriptionItem>
                    <Styled.DinnerInfoDescriptionNavItem>
                      rodzaje dań
                    </Styled.DinnerInfoDescriptionNavItem>
                    {dinner.mealTypes.map((mealType) => (
                      <li key={mealType}> {renderDinnerMealType(mealType)}</li>
                    ))}
                  </Styled.DinnerInfoDescriptionItem>
                )}

                <Styled.DinnerInfoDescriptionItem>
                  <Styled.DinnerInfoDescriptionNavItem>
                    typ dania
                  </Styled.DinnerInfoDescriptionNavItem>
                  <p>{renderDinnerMealTypeKind(dinner.mealTypesKind)}</p>
                </Styled.DinnerInfoDescriptionItem>

                {dinner.tags && dinner.tags.length > 0 && (
                  <Styled.DinnerInfoDescriptionItem>
                    <Styled.DinnerInfoDescriptionNavItem>
                      tagi
                    </Styled.DinnerInfoDescriptionNavItem>
                    {dinner.tags.map((tag) => (
                      <li key={tag}> {renderDinnerTag(tag)}</li>
                    ))}
                  </Styled.DinnerInfoDescriptionItem>
                )}

                {dinner.galleryArr && dinner.galleryArr.length > 0 && (
                  <Styled.DinnerInfoDescriptionItem>
                    <Styled.DinnerInfoDescriptionNavItem>
                      galeria
                    </Styled.DinnerInfoDescriptionNavItem>
                    <Styled.GalleryWrapper>
                      {dinner.galleryArr.map((galleryImage) => (
                        <Styled.GalleryImage
                          key={galleryImage?._id}
                          src={galleryImage?.imageURL || NoImage}
                        />
                      ))}
                    </Styled.GalleryWrapper>
                  </Styled.DinnerInfoDescriptionItem>
                )}
              </Styled.DinnerInfoDescriptionWrapper>
            </Styled.DinnerInfoWrapper>
          </StepStyled.DinnerStepContentWrapper>
        )}
      </StepStyled.DinnerStepContentContainer>
    </StepStyled.DinnerStepWrapper>
  );
};

export default BasicInfo;
