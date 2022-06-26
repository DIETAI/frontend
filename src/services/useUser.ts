import useSWR from "swr";
import axios from "utils/api";
// import fetcher from "utils/fetcher";

// const accessToken = localStorage.getItem("accessToken");

// const authConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     authorization: `Bearer ${accessToken}`,
//   },
// };

interface IUser {
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: string;
}

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const useUser = () => {
  const { data, error } = useSWR<IUser | null>(`/api/v1/user`, fetcher);

  return {
    user: data,
    userLoading: !error && !data,
    userError: error,
  };
};
