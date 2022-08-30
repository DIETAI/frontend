import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getDinners } from "services/getDinners";
import { useTranslation } from "react-i18next";

//styles
import * as Styled from "./Dinner.styles";

//icons
import { FaSearch } from "icons/icons";

//components
import Image from "components/form/images/image/Image";
import AllDinners from "./allDinners/AllDinners";
import RecommendDinners from "./recommendDinners/RecommendDinners";

type IFilterOption = "recommend" | "all";

const Dinner = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <>
      <Styled.AddDinnerNavWrapper>
        <Styled.SearchWrapper>
          <FaSearch />
          <input
            placeholder={t("dataGrid.search")}
            onChange={handleChange}
            value={searchValue}
          />
        </Styled.SearchWrapper>
        <Styled.AddDinnerNavFilterWrapper>
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
        </Styled.AddDinnerNavFilterWrapper>
      </Styled.AddDinnerNavWrapper>
      {filterOption === "recommend" && (
        <RecommendDinners changeDinner={changeDinner} />
      )}
      {filterOption === "all" && (
        <AllDinners changeDinner={changeDinner} searchValue={searchValue} />
      )}
      {/* <Styled.DinnerList>
        {dinners?.map((dinner) => (
          <Styled.DinnerItem
            activeItem={selectedDinnerId === dinner._id}
            key={dinner._id}
            onClick={() => changeDinner(dinner._id)}
          >
            {dinner.image && (
              <Image imageId={dinner.image} roundedDataGrid={true} />
            )}
            <h2>{dinner.name}</h2>
          </Styled.DinnerItem>
        ))}
      </Styled.DinnerList> */}
    </>
  );
};

export default Dinner;
