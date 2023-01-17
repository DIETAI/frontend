import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import {
  IDinnerPortionData,
  IDinnerProductPortion,
} from "interfaces/dinner/dinnerPortions.interfaces";
import { IDinnerProductData } from "interfaces/dinner/dinnerProducts.interfaces";
import { IProductData } from "interfaces/product.interfaces";
import { IDietDayData } from "./dietDays.interfaces";
import { IDietDinnerData } from "./dietDinners.interfaces";
import { IDietMealData } from "./dietMeals.interfaces";

export interface IDietPopulateData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  name: string;
  daysAmount: number;
  dayStart?: Date;
  dayEnd?: Date;
  establishmentId: Pick<
    IDietEstablishmentData,
    | "_id"
    | "name"
    | "protein"
    | "fat"
    | "carbohydrates"
    | "digestableCarbohydrates"
    | "fiber"
    | "kcal"
    | "meals"
  >;
  dietDays: IDietDayPopulateData[];
}

export interface IDietDayPopulateData
  extends Pick<
    IDietDayData,
    "_id" | "order" | "name" | "dietId" | "date" | "total"
  > {
  dietMeals: IDietMealPopulateData[];
}

export interface IDietMealPopulateData
  extends Pick<
    IDietMealData,
    | "_id"
    | "order"
    | "name"
    | "type"
    | "total"
    | "establishmentMealId"
    | "dayId"
  > {
  dietDinners: IDietDinnerPopulateData[];
}

export interface IDietDinnerPopulateData
  extends Pick<IDietDinnerData, "_id" | "order" | "dietMealId" | "dayId"> {
  dinnerPortionId: IDietDinnerPortionPopulateData;
}

interface IDietDinnerPortionPopulateData
  extends Pick<IDinnerPortionData, "_id" | "total"> {
  dinnerId: Pick<IDinnerData, "_id" | "name" | "image">;
  dinnerProducts: IDietDinnerProductPopulateData[];
}

interface IDietDinnerProductPopulateData
  extends Pick<IDinnerProductPortion, "_id" | "total" | "portion"> {
  dinnerProductId: IDinnerProductPopulateData;
}

interface IDinnerProductPopulateData extends Pick<IDinnerProductData, "_id"> {
  productId: Pick<IProductData, "_id" | "name" | "image">;
}
