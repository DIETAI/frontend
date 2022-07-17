export interface IDataGridPaginationProps {
  currentPage: number;
  pageCount: number;
  changePage: (page: number) => void;
  itemsPerPage: number;
  changeItemsPerPage: (page: number) => void;
}
