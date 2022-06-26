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
  total?: object;
}
