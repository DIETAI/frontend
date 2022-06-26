import { IAvailableColumn, IDataRow } from "../DataGrid.interfaces";

export interface IPdfDoc {
  columns: IAvailableColumn[];
  data: IDataRow[];
}
