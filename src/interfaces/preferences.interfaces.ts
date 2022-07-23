export interface IPreferencesData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  establishmentId: string;
  questionnaireId?: string;
  //basicInfo
  availableMeals?: string[];
  mealsGroupId?: string;
  excludedMeals?: string[];
  availableProducts?: string[];
  exludedProducts?: string[];
  productsGroupId?: string;
  liquids?: {
    type: "coffe" | "tea";
    amountPerDay: number;
  };
  supplements?: {
    type: "creatine" | "protein";
    amountPerDay: number;
  };
  trainings?: [
    {
      type: "gym" | "run";
      hour: string;
    }
  ];
  quickMeals: boolean;
  cheapMeals: boolean;
}
