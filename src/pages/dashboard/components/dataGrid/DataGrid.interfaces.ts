export interface IAvailableColumn {
  label: string;
  key: string;
}

export interface IDataRow {
  _id: string;
  [key: string]: string | number;
}

export type TAvailableColumns = IAvailableColumn[];
export type TDataRows = IDataRow[];

export interface IDataGridProps {
  availableColumns: TAvailableColumns;
  dataRows: TDataRows;
  loading: boolean;
  linkPage: string;
  deleteAction: () => void;
}
