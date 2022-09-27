export interface IDietEstablishmentMeal {
  _id: string;
  time: string;
  name: string;
  type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  procent: number;
  kcal: number;
}

export interface IDietEstablishmentMacrohydrate {
  gram: number;
  kcal: number;
  procent: number;
}

//dodać minGram, maxGram, minKcal, maxKcal
export interface IDietEstablishmentMacrohydrateMinMax
  extends IDietEstablishmentMacrohydrate {
  min_procent: number;
  max_procent: number;
  min_gram: number;
  max_gram: number;
  min_kcal: number;
  max_kcal: number;
}

export interface IDietEstablishmentVitamin {
  amount: number;
  unit: "mg" | "uq" | "j.";
}

export interface IDietEstablishmentMinerals {
  amount: number;
  unit: "mg" | "uq" | "j.";
}

export interface IDietEstablishmentData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  //basicInfo
  name: string;
  folder?: string;
  description?: string;
  dietKind?: string;
  measurementId?: string;
  client: string;
  clientMeasurementCpm: boolean;
  kcal: number;
  //meals
  meals: IDietEstablishmentMeal[];
  //macrohydrates
  protein: IDietEstablishmentMacrohydrateMinMax;
  fat: IDietEstablishmentMacrohydrateMinMax;
  carbohydrates: IDietEstablishmentMacrohydrateMinMax;
  digestableCarbohydrates: Omit<IDietEstablishmentMacrohydrate, "procent">;
  fiber: Omit<IDietEstablishmentMacrohydrate, "procent">;
  animalProtein: IDietEstablishmentMacrohydrate;
  vegetableProtein: IDietEstablishmentMacrohydrate;
  carbohydrateExchangers: number;
  proteinFatExchangers: number;
  //fattyAcids
  saturatedFattyAcids?: number;
  pollyunsaturatedFattyAcids?: number;
  pollyunsaturatedFattyAcidsOmega3?: number;
  pollyunsaturatedFattyAcidsOmega6?: number;
  monounsaturatedFattyAcids?: number;
  //vitamins
  vitaminA?: IDietEstablishmentVitamin;
  vitaminB2?: IDietEstablishmentVitamin;
  vitaminB5?: IDietEstablishmentVitamin;
  vitaminB6?: IDietEstablishmentVitamin;
  vitaminB12?: IDietEstablishmentVitamin;
  biotin?: IDietEstablishmentVitamin;
  folicAcid?: IDietEstablishmentVitamin;
  vitaminC?: IDietEstablishmentVitamin;
  vitaminD?: IDietEstablishmentVitamin;
  vitaminE?: IDietEstablishmentVitamin;
  vitaminPP?: IDietEstablishmentVitamin;
  vitaminK?: IDietEstablishmentVitamin;
  //minerals
  zinc?: IDietEstablishmentMinerals;
  phosphorus?: IDietEstablishmentMinerals;
  magnesium?: IDietEstablishmentMinerals;
  copper?: IDietEstablishmentMinerals;
  potassium?: IDietEstablishmentMinerals;
  selenium?: IDietEstablishmentMinerals;
  sodium?: IDietEstablishmentMinerals;
  calcium?: IDietEstablishmentMinerals;
  iron?: IDietEstablishmentMinerals;
  patient: {
    fullName: string;
  };
}

export interface IDietEstablishmentProps {
  dietEstablishment: IDietEstablishmentData;
}
