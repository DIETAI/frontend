import useSWR from "swr";
import fetcher from "utils/fetcher";
import {
  IDinnerPortionData,
  IDinnerPortionQueryData,
} from "interfaces/dinner/dinnerPortions.interfaces";

export const getDinnerPortions = (dinnerId: string) => {
  const { data, error } = useSWR<IDinnerPortionData[] | null>(
    `/api/v1/dinnerPortions/dinner/${dinnerId}`,
    fetcher
  );

  return {
    dinnerPortions: data,
    dinnerPortionsLoading: !error && !data,
    dinnerPortionsError: error,
  };
};

export const getDinnerPortionsQuery = (dinnerId: string) => {
  const { data, error } = useSWR<IDinnerPortionQueryData[] | null>(
    `/api/v1/dinnerPortions/dinner/${dinnerId}/query`,
    fetcher
  );

  return {
    dinnerPortionsQuery: data,
    dinnerPortionsLoadingQuery: !error && !data,
    dinnerPortionsErrorQuery: error,
  };
};

export const getDinnerProduct = (id: string) => {
  const { data, error } = useSWR<IDinnerPortionData | null>(
    `/api/v1/dinnerPortions/${id}`,
    fetcher
  );

  return {
    dinnerPortion: data,
    dinnerPortionLoading: !error && !data,
    dinnerPortionError: error,
  };
};
