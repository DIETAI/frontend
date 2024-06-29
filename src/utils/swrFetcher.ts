import axiosInstance from "./api";

export const swrFetcher = async (
  url: string,
  headers = {},
  withCredentials = true
) => {
  const res = await axiosInstance.get(url, {
    headers,
    withCredentials,
  });
  return res.data;
};
