import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";

//styles
import * as Styled from "./Meals.styles";
import * as StepStyled from "../../DietEstablishmentContent.styles";

//icons
import { FaUtensils } from "icons/icons";

//assets
import NoDataImg from "assets/noData.svg";

//components
import LoadingGrid from "../../../loading/LoadingGrid";
import { getDietEstablishment } from "services/getDietEstablishments";

const Meals = () => {
  const { t } = useTranslation();

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
          <FaUtensils />
        </StepStyled.IconWrapper>
        <h2>Posiłki</h2>
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
            {dietEstablishment.meals.length < 1 && (
              <StepStyled.DietEstablishmentEmptyItemWrapper>
                <img src={NoDataImg} />
                <h2>Brak dodanych posiłków</h2>
              </StepStyled.DietEstablishmentEmptyItemWrapper>
            )}
            {dietEstablishment.meals.length > 1 && (
              <StepStyled.DietEstablishmentItemsWrapper>
                {dietEstablishment.meals.map((meal, index) => (
                  <Styled.FieldWrapper key={meal._id}>
                    <Styled.FieldHeadWrapper>
                      <Styled.FieldNumberWrapper>
                        <p>{index + 1}</p>
                      </Styled.FieldNumberWrapper>
                    </Styled.FieldHeadWrapper>
                    <StepStyled.DietEstablishmentItem>
                      <h2>posiłek: </h2>
                      <p>{meal.name}</p>
                    </StepStyled.DietEstablishmentItem>
                    <StepStyled.DietEstablishmentItem>
                      <h2>godzina: </h2>
                      <p>{meal.time}</p>
                    </StepStyled.DietEstablishmentItem>
                    <StepStyled.DietEstablishmentItem>
                      <h2>wartość procentowa posiłku w ciągu dnia:</h2>
                      <p>{meal.procent}</p>
                    </StepStyled.DietEstablishmentItem>
                    <StepStyled.DietEstablishmentItem>
                      <h2>
                        wartość energetyczna posiłku w ciągu dnia [kcal]:{" "}
                      </h2>
                      <p>{meal.kcal}</p>
                    </StepStyled.DietEstablishmentItem>
                  </Styled.FieldWrapper>
                ))}
              </StepStyled.DietEstablishmentItemsWrapper>
            )}
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default Meals;
