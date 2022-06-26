import useSWR from "swr";
import axios from "utils/api";
import { IDietDayMealData } from "interfaces/diet/dietMeals.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

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
