import useSWR from "swr";
import axios from "utils/api";
import { IAssetData } from "interfaces/asset.interfaces";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getAssets = () => {
  const { data, error } = useSWR<IAssetData[] | null>(
    `/api/v1/assets`,
    fetcher
  );

  return {
    assets: data,
    assetsLoading: !error && !data,
    assetsError: error,
  };
};

export const getAsset = (id: string) => {
  const { data, error } = useSWR<IAssetData | null>(
    `/api/v1/assets/${id}`,
    fetcher
  );

  return {
    asset: data,
    assetLoading: !error && !data,
    assetError: error,
  };
};
