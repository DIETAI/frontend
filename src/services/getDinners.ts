import useSWR from "swr";
import fetcher from "utils/fetcher";
import {
  IDinnerData,
  IDinnerPaginationData,
} from "interfaces/dinner/dinner.interfaces";

export const getDinners = (page?: string, itemsCount?: number) => {
  if (page) {
    const { data, error } = useSWR<IDinnerPaginationData>(
      `/api/v1/dinners?page=${page}&itemsCount=${itemsCount}`, //correct
      fetcher
    );

    return {
      dinners: data?.dinners,
      dinnersLoading: !error && !data,
      dinnersError: error,
      pagination: data?.pagination,
    };
  }

  const { data, error } = useSWR<IDinnerData[]>(`/api/v1/dinners`, fetcher);

  return {
    dinners: data,
    dinnersLoading: !error && !data,
    dinnersError: error,
  };
};

export const getDinner = (id: string) => {
  const { data, error } = useSWR<IDinnerData | null>(
    `/api/v1/dinners/${id}`,
    fetcher
  );

  return {
    dinner: data,
    dinnerLoading: !error && !data,
    dinnerError: error,
  };
};
