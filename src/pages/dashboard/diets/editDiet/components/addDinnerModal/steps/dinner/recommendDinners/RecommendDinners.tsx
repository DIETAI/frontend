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

interface IRecommendDinnersProps {
  changeDinner: (dinnerId: string) => void;
}

interface IRecommendDietDinnerArg {
  _id: string;
  userId: string;
  "diet._id": string;
  "diet.name": string;
  "diet.clientId": string;
  "diet.clientPreferencesGroup": number;
  "dinner._id": string;
  "dinner.name": string;
  "dinner.products": string[];
  "dinner.likedProductsPoints": number;
  "meal._id": string;
  "meal.name": string;
  "meal.type": string;
}

interface IRecommendDinnerData {
  distance: number;
  recommend_dinner: string;
  recommend_dinner_id: string;
  mealType: string;
}

interface IRecommendDinnersState {
  data: IRecommendDinnerData[];
  error: boolean;
  loading: boolean;
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

  const [recommendDinners, setRecommendDinners] =
    useState<IRecommendDinnersState>({
      data: [],
      loading: false,
      error: false,
    });

  const { dinners, dinnersError, dinnersLoading } = getDinners();
  const selectedDinnerId = watch("dinnerId") as string;
  const dayId = watch("dayId") as string;
  const mealId = watch("dietMealId") as string;

  const { dietDayMeal } = getDietDayMeal(mealId);

  //getDietDinners
  const { dietDinners, dietDinnersLoading, dietDinnersError } =
    getDietDinnersByDayId(dayId); //przerobić controller getDietDinnersByDayId

  useEffect(() => {
    if (dietDinners && dietDinners.length > 0) {
      const getRecommendDinners = async () => {
        console.log({ dietDinners });
        const allDietDinners: IRecommendDietDinnerArg[] = dietDinners.map(
          (dietDinner) => ({
            _id: dietDinner._id,
            userId: dietDinner.user,
            "diet._id": dietDinner.dietId + "sed", //nie może być takie same id diety jak już dodanych dietDinners
            "diet.name": dietDinner.diet.name,
            "diet.clientId": dietDinner.diet.clientId,
            "diet.clientPreferencesGroup": 1,
            "dinner._id": dietDinner.dinner._id,
            "dinner.name": dietDinner.dinner.name,
            "dinner.products": ["dadqdqd", "dqdwq"],
            "dinner.likedProductsPoints": 0,
            "meal._id": dietDinner.dietMealId,
            "meal.name": dietDinner.meal.name,
            "meal.type": dietDinner.meal.type,
          })
        );

        const data = {
          diet_dinners: allDietDinners,
          mealTypeToGenerate: dietDayMeal?.type,
        };

        console.log({ data });

        try {
          setRecommendDinners({ ...recommendDinners, loading: true });

          const recommendDinnersRes = await axios.post<IRecommendDinnerData[]>(
            "https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-dinners",
            data
          );

          console.log({ recommendDinnersRes });

          setRecommendDinners({
            ...recommendDinners,
            data: recommendDinnersRes.data,
            loading: false,
          });
        } catch (e) {
          console.log(e);
          setRecommendDinners({
            ...recommendDinners,
            loading: false,
            error: true,
          });
        }
      };

      getRecommendDinners();
    }
  }, [dietDinners]);
  return (
    <>
      <Styled.DinnerList>
        <AnimatePresence>
          {recommendDinners.loading && (
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
          {recommendDinners.data.length > 0 &&
            recommendDinners.data.map((recommendDinner) => (
              <RecommendDinner
                key={recommendDinner.recommend_dinner_id}
                dinnerId={recommendDinner.recommend_dinner_id}
                selectDinner={() =>
                  changeDinner(recommendDinner.recommend_dinner_id)
                }
              />
            ))}
        </AnimatePresence>
        <AnimatePresence>
          {recommendDinners.data.length < 1 && !recommendDinners.loading && (
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
            <Image imageId={dinner.image._id} roundedDataGrid={true} />
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
