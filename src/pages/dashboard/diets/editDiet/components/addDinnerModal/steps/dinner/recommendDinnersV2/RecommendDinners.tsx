import React, { useState, useEffect } from "react";
import axios from "utils/api";
import { AnimatePresence } from "framer-motion";
import ReactLoading from "react-loading";
import NoData from "assets/noData.svg";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { useParams } from "react-router";

//styles
import * as Styled from "../Dinner.styles";

//components
import Image from "components/form/images/image/Image";

//form
import { useFormContext } from "react-hook-form";

//services
import { getDinner, getDinners } from "services/getDinners";
import { getDietDinners, getDietDinnersByDayId } from "services/getDietDinners";
import { getDietDayMeal } from "services/getDietMeals";

//icons
import { FaSearch, FaEdit, FaPlus } from "icons/icons";
import {
  getDinnerProducts,
  getDinnerProductsQuery,
} from "services/getDinnerProducts";
import { getRecommendDinners } from "services/recommend/getRecommendDinners";

interface IRecommendDinnersProps {
  changeDinner: (dinnerId: string) => void;
}

const RecommendDinners = ({ changeDinner }: IRecommendDinnersProps) => {
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

  //if(allDayDietDinners.length < 1) return
  //if (mealDietDinners.length < 1) retrun getRecommendDinners (day)

  const { recommendDinners, recommendDinnersLoading, recommendDinnersError } =
    getRecommendDinners({ dietMealId: mealId, currentDayId: dayId, mealType });

  if (recommendDinnersError)
    return (
      <Styled.DinnerList>
        <Styled.EmptyDataWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img src={NoData} />
          <h2>brak rekomendowanych posiłków</h2>
        </Styled.EmptyDataWrapper>
      </Styled.DinnerList>
    );

  return (
    <>
      <Styled.DinnerList>
        <AnimatePresence>
          {recommendDinnersLoading && (
            <Styled.LoadingWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReactLoading type="spin" color="blue" height={50} width={50} />
              <h2>szukanie posiłków</h2>
            </Styled.LoadingWrapper>
          )}
        </AnimatePresence>
        {/* {JSON.stringify(recommendDinners)}
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
        ))} */}
        <AnimatePresence>
          {recommendDinners &&
            recommendDinners.length > 0 &&
            recommendDinners.map((recommendDinner) => (
              <RecommendDinner
                key={recommendDinner.recommendDinnerId}
                dinnerId={recommendDinner.recommendDinnerId}
                selectDinner={() =>
                  changeDinner(recommendDinner.recommendDinnerId)
                }
              />
            ))}
        </AnimatePresence>
        <AnimatePresence>
          {recommendDinners && recommendDinners.length < 1 && (
            <Styled.EmptyDataWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={NoData} />
              <h2>brak rekomendowanych posiłków</h2>
            </Styled.EmptyDataWrapper>
          )}
        </AnimatePresence>
      </Styled.DinnerList>
    </>
  );
};

const RecommendDinner = ({
  dinnerId,
  selectDinner,
}: {
  dinnerId: string;
  selectDinner: (dinnerId: string) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  const navigate = useNavigate();
  const { dietEditId } = useParams();

  const { dinner, dinnerLoading, dinnerError } = getDinner(dinnerId);
  const { dinnerProductsQuery } = getDinnerProductsQuery(dinnerId);

  if (!dinner) return null;
  if (!dinnerProductsQuery) return null;

  const selectedDinnerId = watch("dinnerId") as string;

  const dietDinnerParams = {
    dietId: dietEditId || "",
    editDinnerId: selectedDinnerId || "",
  };

  return (
    <Styled.DinnerItem
      activeItem={selectedDinnerId === dinner._id}
      key={dinner._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Styled.DinnerItemContent>
        <Styled.DinnerItemName>
          {dinner.image && (
            <Image imageId={dinner.image} roundedDataGrid={true} />
          )}
          <h2>{dinner.name}</h2>
        </Styled.DinnerItemName>
        <Styled.DinnerItemOptionsWrapper>
          <Styled.DinnerItemButton
            buttonVariant="add"
            onClick={() => selectDinner(dinner._id)}
            type="button"
            disabled={
              dinnerProductsQuery.length < 1 || selectedDinnerId === dinner._id
            }
            // onClick={() =>
            //   navigate(`/dashboard/diet-establishments/${establishment._id}`)
            // }
          >
            <FaPlus />
          </Styled.DinnerItemButton>
          <Styled.DinnerItemButton
            buttonVariant="view"
            type="button"
            onClick={() =>
              navigate({
                pathname: `/dashboard/dinners/${dinner._id}`,
                search: `?${createSearchParams(dietDinnerParams)}`,
              })
            }
            // onClick={() =>
            //   navigate(`/dashboard/diet-establishments/${establishment._id}`)
            // }
          >
            <FaSearch />
          </Styled.DinnerItemButton>
          <Styled.DinnerItemButton
            buttonVariant="edit"
            type="button"
            onClick={() =>
              navigate({
                pathname: `/dashboard/dinners/edit/${dinner._id}`,
                search: `?${createSearchParams(dietDinnerParams)}`,
              })
            }
            // onClick={() => addEstablishment(establishment._id)}
          >
            <FaEdit />
          </Styled.DinnerItemButton>
        </Styled.DinnerItemOptionsWrapper>
      </Styled.DinnerItemContent>
      <Styled.ItemFeaturesWrapper>
        {dinnerProductsQuery?.map((dinnerProduct) => (
          <Styled.ItemFeature key={dinnerProduct._id}>
            {dinnerProduct.product.name}
          </Styled.ItemFeature>
        ))}
      </Styled.ItemFeaturesWrapper>
    </Styled.DinnerItem>
  );
};

export default RecommendDinners;
