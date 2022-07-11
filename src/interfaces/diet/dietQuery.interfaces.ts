import { IDietDayData } from "./dietDays.interfaces";
import { IDietDayMealData } from "./dietMeals.interfaces";
import { IDietDinnerData } from "./dietDinners.interfaces";
import { IDinnerData } from "../dinner/dinner.interfaces";
import {
  IDinnerPortionData,
  IDinnerPortionQueryData,
  IDinnerProductPortion,
} from "../dinner/dinnerPortions.interfaces";
import { IProductData } from "interfaces/product.interfaces";
import { IDinnerProductData } from "interfaces/dinner/dinnerProducts.interfaces";

export interface IDietProductsQueryData extends IDinnerProductData {
  product: IProductData;
}

//dinnerProducts => dinnerProductId, portion, total, dinnerProduct

export interface IDietDinnerProductsQueryData extends IDinnerProductPortion {
  dinnerProduct: IDietProductsQueryData;
}

export interface IDietDinnerPortionQueryData extends IDietDinnerQueryData {
  dinner: IDinnerData;
  dinnerProducts: IDietDinnerProductsQueryData[];
  // dinnerProductsArr: IDietProductsQueryData[];
}

export interface IDietDinnerQueryData extends IDietDinnerData {
  dinnerPortion: IDietDinnerPortionQueryData;
}

export interface IDietMealQueryData extends IDietDayMealData {
  dinners: IDietDinnerQueryData[];
}

export interface IDietDayQueryData extends IDietDayData {
  meals: IDietMealQueryData[];
}

export interface IDietQueryData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  name: string;
  folder?: string;
  daysAmount: number;
  dayStart?: Date;
  dayEnd?: Date;
  establishmentId: string;
  days: IDietDayQueryData[];
}
