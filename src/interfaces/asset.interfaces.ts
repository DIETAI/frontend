export interface IAssetData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  title: string;
  description?: string;
  imageURL: string;
}

export interface IAssetProps {
  asset: IAssetData;
}
