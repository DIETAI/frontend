import useSWR from "swr";
import axios from "utils/api";
import { IDietData } from "interfaces/diet/diet.interfaces";
import { IDietQueryData } from "interfaces/diet/dietQuery.interfaces";
import { IDietDayData } from "interfaces/diet/dietDays.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getDiets = () => {
  const { data, error } = useSWR<IDietData[] | null>(`/api/v1/diets`, fetcher);

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

export const getDietQuery = (id: string) => {
  const { data, error } = useSWR<IDietQueryData | null>(
    `/api/v1/diets/${id}/query`,
    fetcher,
    { refreshInterval: 1000 }
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
