import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getDinners } from "services/getDinners";

//styles
import * as Styled from "./Dinner.styles";

type IFilterOption = "recommend" | "all";

const Dinner = () => {
  const [filterOption, setFilterOption] = useState<IFilterOption>("recommend");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const { dinners, dinnersError, dinnersLoading } = getDinners();

  const changeDinner = (dinnerId: string) => {
    setValue("dinnerId", dinnerId);
    trigger();
  };

  const selectedDinnerId = watch("dinnerId") as string;

  return (
    <>
      <Styled.AddDinnerNavWrapper>
        <input />
        <Styled.AddDinnerNavItem
          activeOption={filterOption === "recommend"}
          onClick={() => setFilterOption("recommend")}
        >
          rekomendowane
        </Styled.AddDinnerNavItem>
        <Styled.AddDinnerNavItem
          activeOption={filterOption === "all"}
          onClick={() => setFilterOption("all")}
        >
          wszystkie
        </Styled.AddDinnerNavItem>
      </Styled.AddDinnerNavWrapper>
      <Styled.DinnerList>
        {dinners?.map((dinner) => (
          <Styled.DinnerItem
            activeItem={selectedDinnerId === dinner._id}
            key={dinner._id}
            onClick={() => changeDinner(dinner._id)}
          >
            {dinner.name}
          </Styled.DinnerItem>
        ))}
      </Styled.DinnerList>
    </>
  );
};

export default Dinner;
