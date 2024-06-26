export interface IColumn {
  key: string;
  label: string;
  type: "text" | "number" | "image" | "images";
}

export interface IDataGridListProps {
  viewLink: string;
  editLink: string;
  deleteAction: () => void;
  loadingData: boolean;
  errorData: boolean;
  data?: any[] | null;
  columns: IColumn[];
  gridViewImage: string;
  renderKey: string;
  renderLabel: string;
  renderImage?: string;
}
