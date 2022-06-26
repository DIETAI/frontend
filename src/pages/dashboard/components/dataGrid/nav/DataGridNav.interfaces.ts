export interface IDataGridNavProps {
  query: string;
  data: object[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  linkPage: string;
  setExportPopupDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}
