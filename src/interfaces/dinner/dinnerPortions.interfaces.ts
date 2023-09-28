import { IDinnerProductData } from "./dinnerProducts.interfaces";
import { IProductData } from "../product.interfaces";
import { ITotal } from "../total.interfaces";

type IDinnerPortionType = "default" | "custom";

export interface IDinnerProductPortion {
  _id: String;
  dinnerProductId: IDinnerProductData;
  portion: number;
  total: ITotal;
}

export interface IDinnerPortionData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  dinnerId: string;
  dinnerProducts: IDinnerProductPortion[];
  total: ITotal;
  type: IDinnerPortionType;
}

export interface IDinnerPortionProps {
  dinnerProduct: IDinnerPortionData;
}

//query
export interface IDinnerProductQuery extends IDinnerProductData {
  product: IProductData;
}

export interface IDinnerPortionDinnerProduct extends IDinnerProductPortion {
  dinnerProduct: IDinnerProductQuery;
}

export interface IDinnerPortionQueryData extends IDinnerPortionData {
  dinnerProducts: IDinnerPortionDinnerProduct[];
}
