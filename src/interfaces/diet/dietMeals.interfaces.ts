import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { IDietDinnerData } from "./dietDinners.interfaces";

export interface IMacrohydratesTotal {
  procent: number;
  gram: number;
  kcal: number;
}

export interface IDietMealTotal {
  kcal: number;
  procent: number;
  protein: IMacrohydratesTotal;
  fat: IMacrohydratesTotal;
  carbohydrates: IMacrohydratesTotal;
  fiber: Omit<IMacrohydratesTotal, "procent">;
}

export interface IDietDayMealData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  establishmentMealId: string;
  dietId: string;
  dayId: string;
  name: string;
  type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  total: IDietMealTotal;
}

//diet generate

export interface IDietMealDinner extends IDietDinnerData {
  dinner: IDinnerData;
}

export interface IDietMealData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  establishmentMealId: string;
  dietId: string;
  dayId: string;
  name: string;
  type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  total: IDietMealTotal;
  dinners: IDietMealDinner[];
}
