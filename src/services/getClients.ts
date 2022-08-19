import useSWR from "swr";
import fetcher from "utils/fetcher";
import {
  IClientData,
  IClientPaginationData,
} from "interfaces/client.interfaces";

export const getClients = (page?: string, itemsCount?: number) => {
  const { data, error } = useSWR<IClientPaginationData | null>(
    `/api/v1/clients?page=${page}&itemsCount=${itemsCount}`,
    fetcher
  );

  return {
    clients: data?.clients,
    clientsLoading: !error && !data,
    clientsError: error,
    pagination: data?.pagination,
  };
};

export const getClient = (id: string) => {
  const { data, error } = useSWR<IClientData | null>(
    `/api/v1/clients/${id}`,
    fetcher
  );

  return {
    client: data,
    clientLoading: !error && !data,
    clientError: error,
  };
};
