import useSWR from "swr";
import axios from "utils/api";
import {
  IDietData,
  IDietPaginationData,
} from "interfaces/diet/diet.interfaces";
import { IDietQueryData } from "interfaces/diet/dietQuery.interfaces";
import { IDietDayData } from "interfaces/diet/dietDays.interfaces";
import { IDietPopulateData } from "interfaces/diet/dietPopulate.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getDiets = (page?: string, itemsCount?: number) => {
  if (page) {
    const { data, error } = useSWR<IDietPaginationData>(
      `/api/v1/diets?page=${page}&itemsCount=${itemsCount}`, //correct
      fetcher
    );

    return {
      diets: data?.diets,
      dietsLoading: !error && !data,
      dietsError: error,
      pagination: data?.pagination,
    };
  }

  const { data, error } = useSWR<IDietData[]>(`/api/v1/diets`, fetcher);

  return {
    diets: data,
    dietsLoading: !error && !data,
    dietsError: error,
  };
};

export const getDiet = (id: string) => {
  const { data, error } = useSWR<IDietData | null>(
    `/api/v1/diets/${id}`,
    fetcher
  );

  return {
    diet: data,
    dietLoading: !error && !data,
    dietError: error,
  };
};

export const getDietPopulate = (id: string) => {
  const { data, error } = useSWR<IDietPopulateData>(
    `/api/v1/diets/${id}/populate`,
    fetcher
  );

  return {
    diet: data,
    dietLoading: !error && !data,
    dietError: error,
  };
};

export const getDietQuery = (id: string) => {
  const { data, error } = useSWR<IDietQueryData | null>(
    `/api/v1/diets/${id}/query`,
    fetcher
    // { refreshInterval: 4000 }
  );

  return {
    dietQuery: data,
    dietQueryLoading: !error && !data,
    dietQueryError: error,
  };
};

// function multiFetcher(...urls:  string[]) {
//   return Promise.all(urls.map(url => fetcher(url))
// }

// export const getDietQueryv2 = (id: string) => {
//   const dietDays = useSWR<IDietDayData[] | null>(
//     `/api/v1/dietDays/diet/${id}`,
//     fetcher
//   );

//   const dietURL =  `/api/v1/diets/${id}`;
//   const dietDaysURL = `/api/v1/dietDays/diet/${id}`;
//   const dietMealsURL = `/api/v1/dietMeals/day/dayId`;

//   const {
//     data: [data1: any, data2, data3],
//   } = useSWR([url1, url2, url3], multiFetcher);

//   return {
//     dietQuery: data,
//     dietQueryLoading: !error && !data,
//     dietQueryError: error,
//   };
// };
