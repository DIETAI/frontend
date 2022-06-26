import {
  IAvailableColumn,
  TAvailableColumns,
  IDataRow,
  TDataRows,
} from "../DataGrid.interfaces";

export interface IDataGridListProps {
  checkedRows: TDataRows;
  availableColumns: TAvailableColumns;
  dataRows: TDataRows;
  handleCheckedRows: (row?: IDataRow) => void;
  loading: boolean;
  linkPage: string;
  deleteAction: () => void;
}
