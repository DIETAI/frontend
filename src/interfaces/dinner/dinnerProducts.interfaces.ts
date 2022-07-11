import { IProductData } from "interfaces/product.interfaces";

export interface IDinnerProductData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  dinnerId: string;
  productId: string;
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
  portionsGram?: number[];
}

export interface IDinnerProductProps {
  dinnerProduct: IDinnerProductData;
}

export interface IDinnerProductQueryData extends IDinnerProductData {
  product: IProductData;
}
