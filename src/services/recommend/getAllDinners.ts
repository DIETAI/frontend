import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { baseURL } from "utils/api";
import { IDietDayMealData } from "interfaces/diet/dietMeals.interfaces";
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { IRecommendDinnerData } from "interfaces/recommend/recommendDinner.interface";
import useSWR from "swr";

// interface Response {
//   data: IDinnerData[];
//   status: "fulfilled" | "rejected";
// }

interface IRecommendDinnersArgs {
  dietMealId: string;
  currentDayId: string;
  mealType: IDietDayMealData["type"];
}

export interface IAllDinner extends IDinnerData {
  recommendDistance?: number;
}

export function getAllDinners({
  dietMealId,
  currentDayId,
  mealType,
}: IRecommendDinnersArgs) {
  const recommendURL = `${process.env.REACT_APP_RECOMMEND_SERVER_URL}/recommend-dinners?dietMealId=${dietMealId}&currentDayId=${currentDayId}&mealType=${mealType}`;
  const dinnersURL = `${baseURL}/api/v1/dinners`;

  const [data, setData] = useState<IAllDinner[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const recommendDinnersResponse =
        axios.get<IRecommendDinnerData[]>(recommendURL);
      const dinnersResponse = axios.get<IDinnerData[]>(dinnersURL, {
        withCredentials: true,
      });

      const allDinners = await Promise.allSettled([
        recommendDinnersResponse,
        dinnersResponse,
      ]);

      if (allDinners[1].status === "rejected") {
        setError(allDinners[1].reason);
      }

      if (
        allDinners[0].status === "rejected" &&
        allDinners[1].status === "fulfilled"
      ) {
        const dinners = allDinners[1].value.data;
        setData(dinners);
      }

      if (
        allDinners[0].status === "fulfilled" &&
        allDinners[1].status === "fulfilled"
      ) {
        const dinners = allDinners[1].value.data;
        const recommendData = allDinners[0].value.data;
        const resultDinners: IAllDinner[] = [];

        for (const dinner of dinners) {
          const filteredDinner = recommendData.find(
            ({ recommendDinnerId, distance }) =>
              recommendDinnerId === dinner._id
          );

          if (filteredDinner) {
            resultDinners.push({
              ...dinner,
              recommendDistance: filteredDinner.distance,
            });
          } else {
            resultDinners.push(dinner);
          }
        }

        const sortedData = [...resultDinners].sort((a, b) => {
          if (a.recommendDistance === undefined) return 1;
          if (b.recommendDistance === undefined) return -1;
          return a.recommendDistance - b.recommendDistance;
        }); // [1, 2, 3, 5, undefined, undefined]

        console.log({ sortedData });

        setData(sortedData);
      }
    };

    fetchData();
  }, []);

  return {
    allDinners: data,
    allDinnersLoading: !data && !error,
    allDinnersError: error,
  };
}

export function getAllDinnersSWR({
  dietMealId,
  currentDayId,
  mealType,
}: IRecommendDinnersArgs) {
  const recommendURL = `${process.env.REACT_APP_RECOMMEND_SERVER_URL}/recommend-dinners?dietMealId=${dietMealId}&currentDayId=${currentDayId}&mealType=${mealType}`;
  const dinnersURL = `${baseURL}/api/v1/dinners`;

  const { data, error } = useSWR([recommendURL, dinnersURL], multiFetcher, {
    revalidateOnFocus: false,
  });

  return {
    allDinners: data,
    allDinnersLoading: !data && !error,
    allDinnersError: error,
  };
}

const multiFetcher = async (...urls: string[]) => {
  const recommendDinnersResponse = axios.get<IRecommendDinnerData[]>(urls[0]);
  const dinnersResponse = axios.get<IDinnerData[]>(urls[1], {
    withCredentials: true,
  });

  const allDinners = await Promise.allSettled([
    recommendDinnersResponse,
    dinnersResponse,
  ]);

  if (allDinners[1].status === "rejected") {
    throw allDinners[1].reason;
  }

  if (
    allDinners[0].status === "rejected" &&
    allDinners[1].status === "fulfilled"
  ) {
    return allDinners[1].value.data;
  }

  if (
    allDinners[0].status === "fulfilled" &&
    allDinners[1].status === "fulfilled"
  ) {
    const dinners = allDinners[1].value.data;
    const recommendData = allDinners[0].value.data;
    const resultDinners: IAllDinner[] = [];

    for (const dinner of dinners) {
      const filteredDinner = recommendData.find(
        ({ recommendDinnerId }) => recommendDinnerId === dinner._id
      );

      if (filteredDinner) {
        resultDinners.push({
          ...dinner,
          recommendDistance: filteredDinner.distance,
        });
      } else {
        resultDinners.push(dinner);
      }
    }

    const sortedData = [...resultDinners].sort((a, b) => {
      if (a.recommendDistance === undefined) return 1;
      if (b.recommendDistance === undefined) return -1;
      return a.recommendDistance - b.recommendDistance;
    });

    console.log({ sortedData });

    return sortedData;
  }
};
