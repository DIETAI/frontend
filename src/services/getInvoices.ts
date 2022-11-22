import useSWR from "swr";
import axios from "utils/api";
import { IInvoiceData } from "interfaces/account/invoice.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getInvoices = () => {
  const { data, error } = useSWR<IInvoiceData[]>(`/api/v1/invoices`, fetcher);

  return {
    invoices: data,
    invoicesLoading: !error && !data,
    invoicesError: error,
  };
};

export const getInvoice = (id: string) => {
  const { data, error } = useSWR<IInvoiceData>(
    `/api/v1/invoices/${id}`,
    fetcher
  );

  return {
    invoice: data,
    invoiceLoading: !error && !data,
    invoiceError: error,
  };
};
