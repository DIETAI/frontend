import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

import { getDinnerPortions } from "services/getDinnerPortions";
import { getDinnerPortionsQuery } from "services/getDinnerPortions";
import ReactLoading from "react-loading";

//styles
import * as Styled from "./DinnerPortion.styles";

//components
import Image from "components/form/images/image/Image";
//macro
import DinnerPortionDayMacroTotal from "./macroTotal/day/DinnerPortionDayMacroTotal";
import DinnerPortionMealMacroTotal from "./macroTotal/meal/DinnerPortionMealMacroTotal";

//steps
import * as Step from "./steps";
import { getDinner } from "services/getDinners";

type IDinnerPortionOption = "added" | "recommend" | "new";

const DinnerPortion = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  const [dinnerPortionOption, setDinnerPortionOption] =
    useState<IDinnerPortionOption>("added");

  const [openAddDinnerPortionPopup, setOpenAddDinnerPortionPopup] =
    useState(false);
  const [openGenerateDinnerPortionPopup, setOpenGenerateDinnerPortionPopup] =
    useState(false);

  const dietMealId = watch("dietMealId") as string;
  const dietId = watch("dietId") as string;
  const selectedDinnerId = watch("dinnerId") as string;
  const selectedDinnerPortionId = watch("dinnerPortionId") as string;

  const { dinnerPortions, dinnerPortionsError, dinnerPortionsLoading } =
    getDinnerPortions(selectedDinnerId);

  useEffect(() => {
    if (dinnerPortions && !selectedDinnerPortionId) {
      const defaultPortion = dinnerPortions.find(
        (portion) => portion.type === "default"
      );
      setValue("dinnerPortionId", defaultPortion?._id);
      trigger();
    }
  }, [dinnerPortions, selectedDinnerPortionId]);

  if (dinnerPortionsLoading)
    return (
      <Styled.LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h2>pobieranie porcji</h2>
      </Styled.LoadingWrapper>
    );
  if (dinnerPortionsError)
    return (
      <Styled.LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2>
          wystąpił problem podczas pobierania porcji, spróbuj ponownie później
        </h2>
      </Styled.LoadingWrapper>
    );

  const selectDinnerPortion = (dinnerPortionId: string) => {
    setValue("dinnerPortionId", dinnerPortionId);
    trigger();
  };

  return (
    <Styled.PortionsWrapper>
      {/* <Styled.PortionsMacroContainer>
        <DinnerPortionDayMacroTotal />
        <DinnerPortionMealMacroTotal />
      </Styled.PortionsMacroContainer> */}

      {/* <Styled.PortionFilterWrapper>
        <Styled.PortionNavItem
          activeOption={dinnerPortionOption === "added"}
          onClick={() => setDinnerPortionOption("added")}
        >
          wszystkie porcje
        </Styled.PortionNavItem>
        <Styled.PortionFilterActions>
          <Styled.PortionNavItem
            activeOption={dinnerPortionOption === "recommend"}
            onClick={() => setOpenGenerateDinnerPortionPopup(true)}
          >
            generuj porcję
          </Styled.PortionNavItem>
          <Styled.PortionNavItem
            activeOption={dinnerPortionOption === "new"}
            onClick={() => setOpenAddDinnerPortionPopup(true)}
          >
            stwórz porcję
          </Styled.PortionNavItem>
        </Styled.PortionFilterActions>
      </Styled.PortionFilterWrapper> */}

      <Step.AddedPortions />
      {openAddDinnerPortionPopup && (
        <Step.NewPortion
          selectedDinnerId={selectedDinnerId}
          closeNewPortionPopup={() => setOpenAddDinnerPortionPopup(false)}
          selectDinnerPortion={selectDinnerPortion}
        />
      )}
      {openGenerateDinnerPortionPopup && (
        <Step.RecommendPortion
          dietId={dietId}
          mealId={dietMealId}
          selectedDinnerId={selectedDinnerId}
          closeRecommendPortionPopup={() =>
            setOpenGenerateDinnerPortionPopup(false)
          }
          selectDinnerPortion={selectDinnerPortion}
        />
      )}
    </Styled.PortionsWrapper>
  );
};

export default DinnerPortion;
