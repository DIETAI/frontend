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
  total?: object;
}
