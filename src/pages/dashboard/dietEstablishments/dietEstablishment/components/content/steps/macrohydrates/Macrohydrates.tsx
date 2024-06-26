import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";

//styles
import * as Styled from "./Macrohydrates.styles";
import * as StepStyled from "../../DietEstablishmentContent.styles";

//icons
import { FaCubes } from "icons/icons";

//components
import LoadingGrid from "../../../loading/LoadingGrid";
import { getDietEstablishment } from "services/getDietEstablishments";

import { IDietEstablishmentMacrohydrateMinMax } from "interfaces/dietEstablishment.interfaces";

interface IMacrohydrateOption {
  id: number;
  key: keyof IDietEstablishmentMacrohydrateMinMax;
}

const Macrohydrates = () => {
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

  const macrohydratesOptions = [
    {
      id: 1,
      key: "protein",
      info: "B",
      name: "Białko",
      value: dietEstablishment?.protein,
    },
    {
      id: 2,
      key: "fat",
      info: "T",
      name: "Tłuszcze",
      value: dietEstablishment?.fat,
    },
    {
      id: 3,
      key: "carbohydrates",
      info: "W",
      name: "Węglowodany",
      value: dietEstablishment?.carbohydrates,
    },
    {
      id: 4,
      key: "fiber",
      info: "Bł",
      name: "Błonnik",
      value: dietEstablishment?.fiber as IDietEstablishmentMacrohydrateMinMax,
    },
    {
      id: 5,
      key: "digestibleCarbohydrates",
      info: "Wp",
      name: "Węglowodany przyswajalne",
      value:
        dietEstablishment?.digestableCarbohydrates as IDietEstablishmentMacrohydrateMinMax,
    },
  ];

  return (
    <StepStyled.DietEstablishmentStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaCubes />
        </StepStyled.IconWrapper>
        <h2>Makroskładniki</h2>
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
              {macrohydratesOptions.map((macrohydrate, index) => (
                <Styled.FieldWrapper key={macrohydrate.id}>
                  <Styled.FieldHeadWrapper>
                    <Styled.FieldNumberWrapper>
                      <p>{macrohydrate.info}</p>
                    </Styled.FieldNumberWrapper>
                    <h3>{macrohydrate.name}</h3>
                  </Styled.FieldHeadWrapper>

                  <StepStyled.DietEstablishmentItem>
                    <h2>gram: </h2>
                    <p>{macrohydrate.value?.gram}</p>
                  </StepStyled.DietEstablishmentItem>
                  <StepStyled.DietEstablishmentItem>
                    <h2>kcal:</h2>
                    <p>{macrohydrate.value?.kcal}</p>
                  </StepStyled.DietEstablishmentItem>

                  {macrohydrate.key !== "digestibleCarbohydrates" &&
                    macrohydrate.key !== "fiber" && (
                      <>
                        {" "}
                        <StepStyled.DietEstablishmentItem>
                          <h2>procent: </h2>
                          <p>{macrohydrate.value?.procent}</p>
                        </StepStyled.DietEstablishmentItem>
                        <StepStyled.DietEstablishmentItem>
                          <h2>minimalna wartość procentowa:</h2>
                          <p>{macrohydrate.value?.min_procent}</p>
                        </StepStyled.DietEstablishmentItem>
                        <StepStyled.DietEstablishmentItem>
                          <h2>maksymalna wartość procentowa:</h2>
                          <p>{macrohydrate.value?.max_procent}</p>
                        </StepStyled.DietEstablishmentItem>
                        <StepStyled.DietEstablishmentItem>
                          <h2>minimalna wartość gram:</h2>
                          <p>{macrohydrate.value?.min_gram}</p>
                        </StepStyled.DietEstablishmentItem>
                        <StepStyled.DietEstablishmentItem>
                          <h2>maksymalna wartość gram:</h2>
                          <p>{macrohydrate.value?.max_gram}</p>
                        </StepStyled.DietEstablishmentItem>
                        <StepStyled.DietEstablishmentItem>
                          <h2>minimalna wartość kcal:</h2>
                          <p>{macrohydrate.value?.min_kcal}</p>
                        </StepStyled.DietEstablishmentItem>
                        <StepStyled.DietEstablishmentItem>
                          <h2>maksymalna wartość kcal:</h2>
                          <p>{macrohydrate.value?.max_kcal}</p>
                        </StepStyled.DietEstablishmentItem>
                      </>
                    )}
                </Styled.FieldWrapper>
              ))}

              <StepStyled.DietEstablishmentItem>
                <h2>wymienniki węglowodanowe: </h2>
                <p>{dietEstablishment.carbohydrateExchangers}</p>
              </StepStyled.DietEstablishmentItem>
              <StepStyled.DietEstablishmentItem>
                <h2>wymienniki białkowo-tłuszczowe: </h2>
                <p>{dietEstablishment.proteinFatExchangers}</p>
              </StepStyled.DietEstablishmentItem>
            </StepStyled.DietEstablishmentItemsWrapper>
          </StepStyled.DietEstablishmentStepContentWrapper>
        )}
      </StepStyled.DietEstablishmentStepContentContainer>
    </StepStyled.DietEstablishmentStepWrapper>
  );
};

export default Macrohydrates;
