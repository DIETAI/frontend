import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getDinners } from "services/getDinners";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { useParams } from "react-router";

//styles
import * as Styled from "./Dinner.styles";

//icons
import { FaSearch } from "icons/icons";

//components
import Image from "components/form/images/image/Image";
import AllDinners from "./allDinners/AllDinners";
import RecommendDinners from "./recommendDinners/RecommendDinners";
import Button from "components/form/button/Button";

type IFilterOption = "recommend" | "all";

const Dinner = () => {
  const { dietEditId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [filterOption, setFilterOption] = useState<IFilterOption>("all");
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

  const selectedDinnerId = watch("dinnerId") as string;
  const selectedDinnerPortionId = watch("dinnerPortionId") as string;

  const changeDinner = (dinnerId: string) => {
    setValue("dinnerId", dinnerId);

    if (selectedDinnerPortionId) {
      setValue("dinnerPortionId", undefined);
    }

    trigger();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  //setValue dietId, dayId, dietMealId, order
  const newDietDinnerParams = {
    dietId: dietEditId || "",
    editDinnerId: selectedDinnerId || "",
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
        <Button
          variant="primary"
          type="button"
          onClick={() =>
            navigate({
              pathname: `/dashboard/dinners/new`,
              search: `?${createSearchParams(newDietDinnerParams)}`,
            })
          }
        >
          stwórz posiłek
        </Button>
      </Styled.AddDinnerNavWrapper>
      <Styled.AddDinnerNavFilterWrapper>
        <Styled.AddDinnerNavItem
          activeOption={filterOption === "all"}
          onClick={() => setFilterOption("all")}
        >
          wszystkie posiłki
        </Styled.AddDinnerNavItem>
        <Styled.AddDinnerNavItem
          activeOption={filterOption === "recommend"}
          onClick={() => setFilterOption("recommend")}
        >
          rekomendowane posiłki
        </Styled.AddDinnerNavItem>
      </Styled.AddDinnerNavFilterWrapper>
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
