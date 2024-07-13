import useSWR from "swr";
import {
  IMeasurementData,
  IMeasurementPaginationData,
} from "interfaces/measurement.interfaces";
import fetcher from "utils/fetcher";

const measurementsApiUrl = "/api/v1/measurements";

export const useMeasurements = (page?: string, itemsCount?: number) => {
  const { data, isLoading, error } = useSWR<IMeasurementPaginationData | null>(
    page || itemsCount
      ? `${measurementsApiUrl}/?page=${page}&itemsCount=${itemsCount}`
      : `${measurementsApiUrl}`,
    fetcher
  );

  return {
    measurements: data?.measurements,
    measurementsLoading: isLoading,
    measurementsError: error,
    pagination: data?.pagination,
  };
};

export const useMeasurement = (id: string) => {
  const { data, isLoading, error } = useSWR<IMeasurementData>(
    `${measurementsApiUrl}/${id}`,
    fetcher
  );

  return {
    measurement: data,
    measurementLoading: isLoading,
    measurementError: error,
  };
};
