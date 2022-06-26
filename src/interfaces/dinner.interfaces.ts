export interface IDinnerProduct {
  productId: string;
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
  portionsGram: number[];
}

export interface IDinnerData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  name: string;
  image?: string;
  gallery?: string[];
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
  dietKinds?: string[];
  tags?: string[];
  preparation_time?: string;
  products: IDinnerProduct[];
}

export interface IDinnerProps {
  dinner: IDinnerData;
}
