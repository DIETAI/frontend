import useSWR from "swr";
import fetcher from "utils/fetcher";
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";

export const getDinners = () => {
  const { data, error } = useSWR<IDinnerData[] | null>(
    `/api/v1/dinners`,
    fetcher
  );

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
