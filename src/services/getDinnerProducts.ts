import useSWR from "swr";
import fetcher from "utils/fetcher";
import { IDinnerProductData } from "interfaces/dinner/dinnerProducts.interfaces";

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
