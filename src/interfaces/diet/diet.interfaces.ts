export interface IDietData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  name: string;
  folder?: string;
  daysAmount: number;
  dayStart?: Date;
  dayEnd?: Date;
  establishmentId: string;
}
