import useSWR from "swr";
import axios from "axios";
import { IRecommendProductData } from "interfaces/recommend/recommendProduct.interface";

// const recommendProductsServerURL =
//   "https://recommend-server.dietai.pl/recommend-products";

const recommendProductsServerURL =
  "https://europe-central2-dietai-372609.cloudfunctions.net/recommend-server/recommend-products";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      //   withCredentials: true,
    })
    .then((res) => res.data);

export const getRecommendProducts = (dinnerId: string) => {
  const { data, error } = useSWR<IRecommendProductData[]>(
    `${recommendProductsServerURL}/${dinnerId}`,
    fetcher
    // { refreshInterval: 1000 }
  );

  return {
    recommendProducts: data,
    recommendProductsLoading: !error && !data,
    recommendProductsError: error,
  };
};
