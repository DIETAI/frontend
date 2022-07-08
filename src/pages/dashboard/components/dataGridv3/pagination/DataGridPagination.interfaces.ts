export interface IDataGridPaginationProps {
  currentPage: number;
  pageCount: number;
  changePage: (page: number) => void;
}
