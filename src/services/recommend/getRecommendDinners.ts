import useSWR from "swr";
import axios from "axios";
import { IRecommendDinnerData } from "interfaces/recommend/recommendDinner.interface";
import { IDietDayMealData } from "interfaces/diet/dietMeals.interfaces";

// const recommendDinnersServerURL =
//   "https://recommend-server.dietai.pl/recommend-dinners";

//recommend dinners
const recommendDinnersServerURL = `https://${process.env.REACT_APP_RECOMMEND_SERVER_DOMAIN}/recommend-dinners`;

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      //   withCredentials: true,
    })
    .then((res) => res.data);

interface IRecommendDinnersArgs {
  dietMealId: string;
  currentDayId: string;
  mealType: IDietDayMealData["type"];
}

export const getRecommendDinners = ({
  dietMealId,
  currentDayId,
  mealType,
}: IRecommendDinnersArgs) => {
  const { data, error } = useSWR<IRecommendDinnerData[]>(
    `${recommendDinnersServerURL}?dietMealId=${dietMealId}&currentDayId=${currentDayId}&mealType=${mealType}`,
    fetcher
    // { refreshInterval: 1000 }
  );

  return {
    recommendDinners: data,
    recommendDinnersLoading: !error && !data,
    recommendDinnersError: error,
  };
};
