import { TAvailableColumns, TDataRows } from "../DataGrid.interfaces";

export interface IExportPopupProps {
  dataRows: TDataRows;
  availableColumns: TAvailableColumns;
  popupDisplay: boolean;
  setExportPopupDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IExportPopupStylesProps {
  variant: "csv" | "pdf";
}
