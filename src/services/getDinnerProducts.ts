import useSWR from "swr";
import fetcher from "utils/fetcher";
import {
  IDinnerProductData,
  IDinnerProductQueryData,
} from "interfaces/dinner/dinnerProducts.interfaces";

export const getDinnerProducts = (dinnerId: string) => {
  const { data, error } = useSWR<IDinnerProductData[] | null>(
    `/api/v1/dinnerProducts/dinner/${dinnerId}`,
    fetcher
  );

  return {
    dinnerProducts: data,
    dinnerProductsLoading: !error && !data,
    dinnerProductsError: error,
  };
};

export const getDinnerProductsQuery = (dinnerId: string) => {
  const { data, error } = useSWR<IDinnerProductQueryData[] | null>(
    `/api/v1/dinnerProducts/dinner/${dinnerId}/query`,
    fetcher
  );

  return {
    dinnerProductsQuery: data,
    dinnerProductsLoadingQuery: !error && !data,
    dinnerProductsErrorQuery: error,
  };
};

export const getDinnerProduct = (id: string) => {
  const { data, error } = useSWR<IDinnerProductData | null>(
    `/api/v1/dinnerProducts/${id}`,
    fetcher
  );

  return {
    dinnerProduct: data,
    dinnerProductLoading: !error && !data,
    dinnerProductError: error,
  };
};
