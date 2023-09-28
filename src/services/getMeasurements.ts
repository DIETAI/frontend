import useSWR from "swr";
import axios from "utils/api";
import {
  IMeasurementData,
  IMeasurementPaginationData,
} from "interfaces/measurement.interfaces";

const fetcher = async (url: string, headers = {}) => {
  const res = await axios.get(url, {
    headers,
    withCredentials: true,
  });
  return res.data;
};

export const getMeasurements = (page?: string, itemsCount?: number) => {
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

export const getMeasurement = (id: string) => {
  const { data, error } = useSWR<IMeasurementData>(
    `/api/v1/measurements/${id}`,
    fetcher
  );

  return {
    measurement: data,
    measurementLoading: !error && !data,
    measurementError: error,
  };
};
