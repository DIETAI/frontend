import axios from "./api";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const multiFetcher = (...urls: string[]) => {
  return Promise.all(urls.map((url) => fetcher(url)));
};

export default fetcher;
