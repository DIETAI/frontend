import { TDataRows } from "../DataGrid.interfaces";

export interface ICheckedPopupProps {
  checkedRows: TDataRows;
  deleteAction: () => void;
}
