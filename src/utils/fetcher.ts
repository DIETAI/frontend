import axios from "./api";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

// const fetcher = async <T>(url: string, headers = {}): Promise<T | null> => {
//   try {
//     const { data } = await axios.get<T>(url, {
//       headers,
//       withCredentials: true,
//     });

//     return data;
//   } catch (e) {
//     return null;
//   }
// };

export default fetcher;
