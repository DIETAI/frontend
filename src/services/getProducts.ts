import useSWR from "swr";
import fetcher from "utils/fetcher";
import {
  IProductData,
  IProductPaginationData,
} from "interfaces/product.interfaces";

export const getProducts = (page?: string, itemsCount?: number) => {
  if (page) {
    const { data, error } = useSWR<IProductPaginationData | null>(
      `/api/v1/products?page=${page}&itemsCount=${itemsCount}`, //correct
      fetcher
    );

    return {
      products: data?.products,
      productsLoading: !error && !data,
      productsError: error,
      pagination: data?.pagination,
    };
  }

  const { data, error } = useSWR<IProductData[] | null>(
    `/api/v1/products`,
    fetcher
  );

  return {
    products: data,
    productsLoading: !error && !data,
    productsError: error,
  };
};

export const getProduct = (id: string) => {
  const { data, error } = useSWR<IProductData | null>(
    `/api/v1/products/${id}`,
    fetcher
  );

  if (!id) {
    return {
      product: undefined,
      productLoading: false,
      productError: false,
    };
  }

  return {
    product: data,
    productLoading: !error && !data,
    productError: error,
  };
};

// import useSWR from "swr";
// import axios from "utils/api";

// const accessToken = localStorage.getItem("accessToken");

// const authConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     authorization: `Bearer ${accessToken}`,
//   },
// };

// const fetcher = (url: string) =>
//   axios.get(url, authConfig).then((res) => res.data);

// function multiFetcher(...urls: string[]) {
//   return Promise.all(urls.map((url) => fetcher(url)));
// }

// const getProducts = () => {
//   const {
//     data: [userProducts, dietAiProducts],
//     error,
//   } = useSWR<any>(
//     [`/api/v1/products`, `/api/v1/diet-ai-products`],
//     multiFetcher
//   );

//   return {
//     userProducts: userProducts,
//     appProducts: dietAiProducts,
//     productsLoading: !error && !userProducts && !dietAiProducts,
//     userError: error,
//   };
// };
