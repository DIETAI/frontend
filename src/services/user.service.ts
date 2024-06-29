import useSWR from "swr";
import {
  ILoginUserInputData,
  IRegisterUserInputData,
  IUser,
  IUserSessionResponseData,
} from "interfaces/user.interfaces";
import { swrFetcher } from "utils/swrFetcher";
import axiosInstance from "utils/api";

//urls
export const userApiUrl = "/api/v1/user";
export const userSessionApiUrl = "/api/v1/sessions";

export const useUser = () => {
  const { data, isLoading, error } = useSWR<IUser | null>(
    userApiUrl,
    swrFetcher,
    {
      errorRetryCount: 5,
    }
  );

  const loggedOut = error && error.response.status === 403;

  return {
    user: data,
    loggedOut,
    userLoading: isLoading,
    userError: error,
  };
};

export const registerUser = async (data: IRegisterUserInputData) => {
  try {
    const newUser = await axiosInstance.post<IUser>(`${userApiUrl}`, data, {
      withCredentials: true,
    });

    return newUser;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (data: ILoginUserInputData) => {
  try {
    const userSession = await axiosInstance.post<IUserSessionResponseData>(
      `${userSessionApiUrl}`,
      data,
      {
        withCredentials: true,
      }
    );

    return userSession;
  } catch (e) {
    throw e;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.delete(`${userSessionApiUrl}`, {
      withCredentials: true,
    });
  } catch (e) {
    throw e;
  }
};
