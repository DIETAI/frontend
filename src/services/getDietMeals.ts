import useSWR from "swr";
import axios from "utils/api";
import {
  IDietDayMealData,
  IDietMealData,
} from "interfaces/diet/dietMeals.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getAllDietMeals = () => {
  const { data, error } = useSWR<IDietMealData[] | null>(
    `/api/v1/dietMeals`,
    fetcher
  );

  return {
    dietMeals: data,
    dietMealsLoading: !error && !data,
    dietMealsError: error,
  };
};

export const getDietDayMeals = (dayId: string) => {
  const { data, error } = useSWR<IDietDayMealData[] | null>(
    `/api/v1/dietMeals/day/${dayId}`,
    fetcher
  );

  return {
    dietDayMeals: data,
    dietDayMealsLoading: !error && !data,
    dietDayMealsError: error,
  };
};

export const getDietDayMeal = (mealId: string) => {
  const { data, error } = useSWR<IDietDayMealData | null>(
    `/api/v1/dietMeals/${mealId}`,
    fetcher
  );

  return {
    dietDayMeal: data,
    dietDayMealLoading: !error && !data,
    dietDayMealError: error,
  };
};
