import { IDietDayData } from "./dietDays.interfaces";
import { IDietDayMealData } from "./dietMeals.interfaces";
import { IDietDinnerData } from "./dietDinners.interfaces";
import { IDinnerData } from "../dinner.interfaces";

export interface IDietDinnerQueryData extends IDietDinnerData {
  dinner: IDinnerData;
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
