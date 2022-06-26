import useSWR from "swr";
import fetcher from "utils/fetcher";
import { IDietDinnerData } from "interfaces/diet/dietDinners.interfaces";

export const getDietDinners = (mealId: string) => {
  const { data, error } = useSWR<IDietDinnerData[] | null>(
    `/api/v1/dietDinners/meal/${mealId}`,
    fetcher
  );

  return {
    dietDinners: data,
    dietDinnersLoading: !error && !data,
    dietDinnersError: error,
  };
};

export const getDietDinner = (dinnerId: string) => {
  const { data, error } = useSWR<IDietDinnerData | null>(
    `/api/v1/dietDinners/${dinnerId}`,
    fetcher
  );

  return {
    dietDinner: data,
    dietDinnerLoading: !error && !data,
    dietDinnerError: error,
  };
};
