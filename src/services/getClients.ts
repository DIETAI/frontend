import useSWR from "swr";
import fetcher from "utils/fetcher";
import { IClientData } from "interfaces/client.interfaces";

export const getClients = () => {
  const { data, error } = useSWR<IClientData[] | null>(
    `/api/v1/clients`,
    fetcher
  );

  return {
    clients: data,
    clientsLoading: !error && !data,
    clientsError: error,
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
