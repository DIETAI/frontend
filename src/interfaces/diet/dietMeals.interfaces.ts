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
  establishmentId: string;
  dietId: string;
  dayId: string;
  name: string;
  type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  total: IDietMealTotal;
}
