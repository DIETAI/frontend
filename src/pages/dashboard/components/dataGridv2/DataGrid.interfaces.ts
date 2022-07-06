export interface IColumn {
  key: string;
  label: string;
  type: "text" | "number" | "image" | "images";
}

export interface IDataGridProps {
  addLink?: string;
  link: string;
  exportAction?: () => void;
  loadingData: boolean;
  data?: any[] | null;
  columns: IColumn[];
}
