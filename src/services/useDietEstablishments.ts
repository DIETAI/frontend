import useSWR from "swr";
import axios from "utils/api";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const useDietEstablishments = () => {
  const { data, error } = useSWR<IDietEstablishmentData[] | null>(
    `/api/v1/dietEstablishments`,
    fetcher
  );

  return {
    dietEstablishments: data,
    dietEstablishmentsLoading: !error && !data,
    dietEstablishmentsError: error,
  };
};

export const useDietEstablishment = (id: string) => {
  const { data, error } = useSWR<IDietEstablishmentData | null>(
    `/api/v1/dietEstablishments/${id}`,
    fetcher
  );

  return {
    dietEstablishment: data,
    dietEstablishmentLoading: !error && !data,
    dietEstablishmentError: error,
  };
};
