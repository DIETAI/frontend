import React, { useState, useEffect } from "react";
import axios from "utils/api";

//styles
import * as Styled from "../Dinner.styles";

//components
import Image from "components/form/images/image/Image";

//form
import { useFormContext } from "react-hook-form";

//services
import { getDinners } from "services/getDinners";
import { getDietDinners, getDietDinnersByDayId } from "services/getDietDinners";

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

  //getDietDinners
  const { dietDinners, dietDinnersLoading, dietDinnersError } =
    getDietDinnersByDayId(dayId); //przerobić controller getDietDinnersByDayId

  useEffect(() => {
    if (dietDinners && dietDinners.length > 0) {
      const getRecommendDinners = async () => {
        const allDietDinners: IRecommendDietDinnerArg[] = dietDinners.map(
          (dietDinner) => ({
            _id: dietDinner._id,
            userId: dietDinner.user,
            "diet._id": dietDinner.dietId,
            "diet.name": dietDinner.diet.name,
            "diet.clientId": dietDinner.diet.clientId,
            "diet.clientPreferencesGroup": 1,
            "dinner._id": dietDinner.dinner._id,
            "dinner.name": dietDinner.dinner.name,
            "dinner.products": [],
            "dinner.likedProductsPoints": 0,
            "meal._id": dietDinner.dietMealId,
            "meal.name": dietDinner.meal.name,
            "meal.type": dietDinner.meal.type,
          })
        );

        console.log({ allDietDinners });

        try {
          setRecommendDinners({ ...recommendDinners, loading: true });

          const recommendDinnersRes = await axios.post<IRecommendDinnerData[]>(
            "https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-dinners",
            allDietDinners
          );

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
    <Styled.DinnerList>
      {JSON.stringify(dietDinners)}
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
    </Styled.DinnerList>
  );
};

export default RecommendDinners;
