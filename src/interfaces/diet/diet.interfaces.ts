export interface IDietData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
  user: string;
  name: string;
  folder?: string;
  daysAmount: number;
  dayStart?: Date;
  dayEnd?: Date;
  establishmentId: string;
}

export interface IDietPaginationData {
  diets: IDietData[];
  pagination: {
    count: number;
    pageCount: number;
  };
}
