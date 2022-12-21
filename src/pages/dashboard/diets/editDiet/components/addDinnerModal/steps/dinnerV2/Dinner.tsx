import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { getAllDinners, IAllDinner } from "services/recommend/getAllDinners";

//styles
import * as Styled from "./Dinner.styles";

//icons
import {
  FaSearch,
  FaStar,
  FaEdit,
  FaPlus,
  FaExclamationCircle,
} from "icons/icons";

//components
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";

//assets
import LogoBackground from "assets/logo-icon.svg";
import NoImage from "assets/noImage.svg";
import NoData from "assets/noData.svg";

//animations
import { AnimatePresence } from "framer-motion";

type IFilterOption = "recommend" | "all";

const search = (currentData: IAllDinner[], query: string) => {
  const dataFilter = currentData.filter(
    (row) => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
  );

  return dataFilter;
};

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

  const dayId = watch("dayId") as string;
  const mealId = watch("dietMealId") as string;
  const mealType = watch("mealType");

  const { allDinners, allDinnersLoading, allDinnersError } = getAllDinners({
    dietMealId: mealId,
    currentDayId: dayId,
    mealType,
  });

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

  console.log({ allDinners });

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
      <Styled.DinnerList>
        <AnimatePresence>
          {allDinnersLoading && (
            <Styled.DinnersLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReactLoading
                type="spin"
                color="#7722FF"
                height={50}
                width={50}
              />
              <h3>pobieranie posiłków</h3>
            </Styled.DinnersLoadingWrapper>
          )}
        </AnimatePresence>

        {allDinnersError && (
          <Styled.ErrorWrapper>
            <FaExclamationCircle />
            <h3>Wystąpił błąd podczas pobierania posiłków</h3>
          </Styled.ErrorWrapper>
        )}

        {allDinners && (
          <>
            {search(allDinners, searchValue).length > 0 &&
              search(allDinners, searchValue).map((dinner) => (
                <Styled.DinnerItem
                  key={dinner._id}
                  activeItem={selectedDinnerId === dinner._id}
                >
                  <Styled.DinnerItemContent>
                    <Styled.DinnerItemName>
                      <Styled.ImageWrapper>
                        <img className="backgroundImg" src={LogoBackground} />
                        <img
                          className="itemImg"
                          src={dinner.imageObj?.imageURL || NoImage}
                        />
                      </Styled.ImageWrapper>
                      <h2>{dinner.name}</h2>
                    </Styled.DinnerItemName>

                    <Styled.OptionsContainer>
                      {dinner.recommendDistance && (
                        <Styled.RecommendItem>
                          <FaStar /> rekomendowany
                        </Styled.RecommendItem>
                      )}

                      <Styled.DinnerItemOptionsWrapper>
                        <Styled.DinnerItemButton
                          buttonVariant="add"
                          onClick={() => changeDinner(dinner._id)}
                          type="button"
                          disabled={selectedDinnerId === dinner._id}
                        >
                          <FaPlus />
                        </Styled.DinnerItemButton>
                        <Styled.DinnerItemButton
                          buttonVariant="view"
                          type="button"
                          onClick={() =>
                            navigate({
                              pathname: `/dashboard/dinners/${dinner._id}`,
                              search: `?${createSearchParams(
                                newDietDinnerParams
                              )}`,
                            })
                          }
                        >
                          <FaSearch />
                        </Styled.DinnerItemButton>
                        <Styled.DinnerItemButton
                          buttonVariant="edit"
                          type="button"
                          onClick={() =>
                            navigate({
                              pathname: `/dashboard/dinners/edit/${dinner._id}`,
                              search: `?${createSearchParams(
                                newDietDinnerParams
                              )}`,
                            })
                          }
                        >
                          <FaEdit />
                        </Styled.DinnerItemButton>
                      </Styled.DinnerItemOptionsWrapper>
                    </Styled.OptionsContainer>
                  </Styled.DinnerItemContent>
                </Styled.DinnerItem>
              ))}

            {search(allDinners, searchValue).length < 1 && (
              <Styled.EmptyWrapper>
                <img src={NoData} />
                <h3>nie znaleziono posiłków</h3>
              </Styled.EmptyWrapper>
            )}
          </>
        )}
      </Styled.DinnerList>
    </>
  );
};

export default Dinner;
