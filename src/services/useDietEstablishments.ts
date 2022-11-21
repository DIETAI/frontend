import useSWR from "swr";
import axios from "utils/api";
import {
  IDietEstablishmentData,
  IDietEstablishmentPaginationData,
} from "interfaces/dietEstablishment.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const useDietEstablishments = (page?: string, itemsCount?: number) => {
  if (page) {
    const { data, error } = useSWR<IDietEstablishmentPaginationData>(
      `/api/v1/dietEstablishments?page=${page}&itemsCount=${itemsCount}`, //correct
      fetcher
    );

    return {
      dietEstablishments: data?.dietEstablishments,
      dietEstablishmentsLoading: !error && !data,
      dietEstablishmentsError: error,
      pagination: data?.pagination,
    };
  }

  const { data, error } = useSWR<IDietEstablishmentData[]>(
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
