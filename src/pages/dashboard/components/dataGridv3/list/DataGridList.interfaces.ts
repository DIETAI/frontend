export interface IColumn {
  key: string;
  label: string;
  type: "text" | "number" | "image" | "images";
}

export interface IDataGridListProps {
  link: string;
  loadingData: boolean;
  data?: any[] | null;
  columns: IColumn[];
}
