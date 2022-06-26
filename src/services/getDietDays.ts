import useSWR from "swr";
import axios from "utils/api";
import { IDietDayData } from "interfaces/diet/dietDays.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getDietDays = (dietId: string) => {
  const { data, error } = useSWR<IDietDayData[] | null>(
    `/api/v1/dietDays/diet/${dietId}`,
    fetcher
  );

  return {
    dietDays: data,
    dietDaysLoading: !error && !data,
    dietDaysError: error,
  };
};

export const getDietDay = (dayId: string) => {
  const { data, error } = useSWR<IDietDayData | null>(
    `/api/v1/dietDays/${dayId}`,
    fetcher
  );

  return {
    dietDay: data,
    dietDayLoading: !error && !data,
    dietDayError: error,
  };
};
