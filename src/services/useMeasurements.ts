import useSWR from "swr";
import axios from "utils/api";
import {
  IMeasurementData,
  IMeasurementPaginationData,
} from "interfaces/measurement.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const useMeasurements = (page?: string, itemsCount?: number) => {
  const { data, error } = useSWR<IMeasurementPaginationData | null>(
    `/api/v1/measurements?page=${page}&itemsCount=${itemsCount}`,
    fetcher
  );

  return {
    measurements: data?.measurements,
    measurementsLoading: !error && !data,
    measurementsError: error,
    pagination: data?.pagination,
  };
};

export const useMeasurement = (id: string) => {
  const { data, error } = useSWR<IMeasurementData | null>(
    `/api/v1/measurements/${id}`,
    fetcher
  );

  return {
    measurement: data,
    measurementLoading: !error && !data,
    measurementError: error,
  };
};
