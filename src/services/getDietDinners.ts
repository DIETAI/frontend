import useSWR from "swr";
import fetcher from "utils/fetcher";
import {
  IDietDinnerByPortionData,
  IDietDinnerData,
  IDietDinnerQueryData,
  IDietDinnerByDayIdQueryData,
} from "interfaces/diet/dietDinners.interfaces";

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

export const getDietDinnersByDayId = (dayId: string) => {
  const { data, error } = useSWR<IDietDinnerByDayIdQueryData[] | null>(
    `/api/v1/dietDinners/day/${dayId}`,
    fetcher
  );

  return {
    dietDinners: data,
    dietDinnersLoading: !error && !data,
    dietDinnersError: error,
  };
};

export const getDietDinnersByPortion = (dinnerPortionId: string) => {
  const { data, error } = useSWR<IDietDinnerByPortionData[] | null>(
    `/api/v1/dietDinners/dinnerPortion/${dinnerPortionId}`,
    fetcher
  );

  return {
    dietDinners: data,
    dietDinnersLoading: !error && !data,
    dietDinnersError: error,
  };
};

export const getDietDinnersQuery = (mealId: string) => {
  const { data, error } = useSWR<IDietDinnerQueryData[]>(
    `/api/v1/dietDinners/meal/${mealId}/query`,
    fetcher
  );

  return {
    dietDinnersQuery: data,
    dietDinnersLoadingQuery: !error && !data,
    dietDinnersErrorQuery: error,
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
