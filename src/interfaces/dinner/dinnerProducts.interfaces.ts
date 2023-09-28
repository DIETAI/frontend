import { IProductData } from "interfaces/product.interfaces";

export interface IDinnerProductData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  dinnerId: string;
  productId: IProductData;
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
  portionsGram: number[];
}

export interface IDinnerProductProps {
  dinnerProduct: IDinnerProductData;
}

//usunąć
export interface IDinnerProductQueryData extends IDinnerProductData {
  product: IProductData;
}
