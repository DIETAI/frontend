import useSWR from "swr";
import axios from "utils/api";
import { IMeasurementData } from "interfaces/measurement.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const useMeasurements = () => {
  const { data, error } = useSWR<IMeasurementData[] | null>(
    `/api/v1/measurements`,
    fetcher
  );

  return {
    measurements: data,
    measurementsLoading: !error && !data,
    measurementsError: error,
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
