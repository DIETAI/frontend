import {
  IDinnerPortionData,
  IDinnerPortionQueryData,
} from "interfaces/dinner/dinnerPortions.interfaces";
import { IDinnerPortionDinnerProduct } from "../dinner/dinnerPortions.interfaces";
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { IDietData } from "pages/dashboard/diets/newDiet/schema/dietData.schema";
import { IDietDayMealData } from "./dietMeals.interfaces";

export interface IDietDinnerData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  dietId: string;
  dayId: string;
  dietMealId: string;
  order: number;
  dinnerPortionId: string;

  // dinnerId: string;
  // name: string;
  // total?: object;
}

export interface IDietDinnerByPortionData extends IDietDinnerData {
  diet: IDietData;
}

export interface IDietDinnerPortionQueryData extends IDinnerPortionData {
  dinnerProducts: IDinnerPortionDinnerProduct[];
  dinner: IDinnerData;
}

export interface IDietDinnerQueryData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  dietId: string;
  dayId: string;
  dietMealId: string;
  order: number;
  dinnerPortionId: string;
  dinnerPortion: IDinnerPortionQueryData;

  // dinnerId: string;
  // name: string;
  // total?: object;
}

export interface IDietDinnerByDayIdQueryData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  dietId: string;
  dayId: string;
  dietMealId: string;
  order: number;
  dinnerPortionId: string;
  diet: IDietData;
  meal: IDietDayMealData;
  dinner: IDinnerData;

  // dinnerId: string;
  // name: string;
  // total?: object;
}
