export interface IDietDinnerData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  dietId: string;
  dayId: string;
  mealId: string;
  dinnerId: string;
  name: string;
  total?: object;
}
