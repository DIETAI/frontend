import useSWR from "swr";
import axios from "utils/api";
import { IDietData } from "interfaces/diet/diet.interfaces";
import { IDietQueryData } from "interfaces/diet/dietQuery.interfaces";

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
    fetcher
  );

  return {
    dietQuery: data,
    dietQueryLoading: !error && !data,
    dietQueryError: error,
  };
};
