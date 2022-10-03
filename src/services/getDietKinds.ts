import useSWR from "swr";
import axios from "utils/api";
import { IDietKindData } from "interfaces/dietKind.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getDietKinds = () => {
  const { data, error } = useSWR<IDietKindData[]>(`/api/v1/dietKinds`, fetcher);

  return {
    dietKinds: data,
    dietKindsLoading: !error && !data,
    dietKindsError: error,
  };
};

export const getDietKind = (id: string) => {
  const { data, error } = useSWR<IDietKindData>(
    `/api/v1/dietKinds/${id}`,
    fetcher
  );

  return {
    dietKind: data,
    dietKindLoading: !error && !data,
    dietKindError: error,
  };
};
