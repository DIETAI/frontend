// export interface IDataGridNavProps {
//   query: string;
//   data: object[];
//   setQuery: React.Dispatch<React.SetStateAction<string>>;
//   linkPage: string;
//   setExportPopupDisplay: React.Dispatch<React.SetStateAction<boolean>>;
// }

export interface IDataGridNavProps {
  addLink?: string;
  exportAction?: () => void;
}
