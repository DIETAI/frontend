export interface IMacrohydratesTotal {
  procent: number;
  gram: number;
  kcal: number;
}

export interface IDietDayTotal {
  kcal: number;
  protein: IMacrohydratesTotal;
  fat: IMacrohydratesTotal;
  carbohydrates: IMacrohydratesTotal;
  fiber: Omit<IMacrohydratesTotal, "procent">;
}

export interface IDietDayData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  establishmentId: string;
  dietId: string;
  name: string;
  date?: Date;
  order: number;
  total: IDietDayTotal;
}
