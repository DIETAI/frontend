import useSWR from "swr";
import axios from "utils/api";
import { IInvoiceData } from "interfaces/account/invoice.interfaces";

const fetcher = async (url: string, headers = {}) => {
  const res = await axios.get(url, {
    headers,
    withCredentials: true,
  });
  return res.data;
};

export const getInvoice = () => {
  const { data, error } = useSWR<IInvoiceData>(`/api/v1/invoices`, fetcher);

  return {
    invoice: data,
    invoiceLoading: !error && !data,
    invoiceError: error,
  };
};
