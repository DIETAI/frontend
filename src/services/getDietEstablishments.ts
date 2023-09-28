import useSWR from "swr";
import axios from "utils/api";
import {
  IDietEstablishmentData,
  IDietEstablishmentPaginationData,
  IDietEstablishmentQueryData,
} from "interfaces/dietEstablishment.interfaces";

const fetcher = async (url: string, headers = {}) => {
  const res = await axios.get(url, {
    headers,
    withCredentials: true,
  });
  return res.data;
};

export const getDietEstablishments = (page?: string, itemsCount?: number) => {
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

export const getDietEstablishment = (id: string) => {
  const { data, error } = useSWR<IDietEstablishmentData>(
    `/api/v1/dietEstablishments/${id}`,
    fetcher
  );

  return {
    dietEstablishment: data,
    dietEstablishmentLoading: !error && !data,
    dietEstablishmentError: error,
  };
};

export const getDietEstablishmentQuery = (id: string) => {
  const { data, error } = useSWR<IDietEstablishmentQueryData>(
    `/api/v1/dietEstablishments/${id}/query`,
    fetcher
  );

  return {
    dietEstablishmentQuery: data,
    dietEstablishmentQueryLoading: !error && !data,
    dietEstablishmentQueryError: error,
  };
};
