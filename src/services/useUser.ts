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

const fetcher = async (url: string, headers = {}) => {
  const res = await axios.get(url, {
    headers,
    withCredentials: true,
  });
  return res.data;
};

export const useUser = () => {
  const { data, error } = useSWR<IUser | null>(`/api/v1/user`, fetcher, {
    shouldRetryOnError: false,
  });

  const loggedOut = error && error.response.status === 403;

  // console.log({ error });

  return {
    user: data,
    loggedOut,
    userLoading: !error && !data,
    userError: error,
  };
};

//https://swr.vercel.app/examples/auth
//https://github.com/vercel/swr/discussions/870
