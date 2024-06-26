import { IAssetData } from "interfaces/asset.interfaces";

export interface IDinnerData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  name: string;
  image?: Pick<IAssetData, "_id" | "imageURL">;
  gallery?: Pick<IAssetData, "_id" | "imageURL">[];
  mealTypes: (
    | "breakfast"
    | "dinner"
    | "second_breakfast"
    | "lunch"
    | "snack"
  )[];
  mealTypesKind: "soup" | "mainCourse" | "drink";
  description?: string;
  recipe?: string;
  dietKindsExclude?: string[];
  tags?: string[];
  preparation_time?: string;
}

export interface IDinnerPaginationData {
  dinners: IDinnerData[];
  pagination: {
    count: number;
    pageCount: number;
  };
}

export interface IDinnerProps {
  dinner: IDinnerData;
}
