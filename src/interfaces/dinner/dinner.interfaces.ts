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
}

export interface IDinnerProps {
  dinner: IDinnerData;
}
