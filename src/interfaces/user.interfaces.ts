import { IAssetData } from "./asset.interfaces";

export interface IUser {
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: IAssetData;
}
