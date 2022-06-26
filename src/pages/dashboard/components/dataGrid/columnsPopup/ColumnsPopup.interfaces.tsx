import { TAvailableColumns, TDataRows } from "../DataGrid.interfaces";

export interface IColumnsPopupProps {
  displayColumns: TAvailableColumns;
  setDisplayColumns: React.Dispatch<React.SetStateAction<TAvailableColumns>>;
  availableColumns: TAvailableColumns;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
