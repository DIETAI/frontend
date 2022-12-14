import useSWR from "swr";
import axios from "axios";
import { IRecommendDinnerData } from "interfaces/recommend/recommendDinner.interface";

const recommendDinnersServerURL =
  "https://recommend-server.dietai.pl/recommend-dinners";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      //   withCredentials: true,
    })
    .then((res) => res.data);

export const getRecommendDinners = (mealId: string) => {
  const { data, error } = useSWR<IRecommendDinnerData[]>(
    `${recommendDinnersServerURL}/${mealId}`,
    fetcher
    // { refreshInterval: 1000 }
  );

  return {
    recommendDinners: data,
    recommendDinnersLoading: !error && !data,
    recommendDinnersError: error,
  };
};
