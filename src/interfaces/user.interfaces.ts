import { IAssetData } from "./asset.interfaces";

export type IUserSessionResponseData = {
  accessToken: string;
  refreshToken: string;
};

export type ILoginUserInputData = {
  email: string;
  password: string;
};

export type IRegisterUserInputData = {
  name: string;
  lastName: string;
} & ILoginUserInputData;

export type IUser = {
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: IAssetData;
};
