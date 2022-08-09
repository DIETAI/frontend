import React, { useEffect } from "react";

//context
import { useDataGridView } from "../context/DataGridViewProvider";
import { useDataGridSearch } from "../context/DataGridSearch.context";
import { useDataGridSelect } from "../context/DataGridSelect.context";

//interfaces
import { IDataGridListProps } from "./DataGridList.interfaces";

//components
import DataGridLineView from "./lineView/DataGridLineView";
import LoadingGrid from "../loading/LoadingGrid";
import EmptyGrid from "../empty/EmptyGrid";

export interface IDataRow {
  _id: string;
  [key: string]: string | number;
}

const search = (currentData: IDataRow[], query: string) => {
  const columns = currentData[0] && Object.keys(currentData[0]);

  const dataFilter = currentData.filter((row) =>
    columns.some(
      (column) =>
        row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  );

  return dataFilter;
};

const DataGridList = ({
  data,
  loadingData,
  columns,
  viewLink,
  editLink,
  deleteAction,
}: IDataGridListProps) => {
  const { view } = useDataGridView();
  const { searchValue } = useDataGridSearch();
  const { selectedItems, unCheckAllItems } = useDataGridSelect();

  useEffect(() => {
    if (searchValue.length > 0 && selectedItems.length > 0) {
      return unCheckAllItems();
    }

    return;
  }, [searchValue, selectedItems]);

  // const { data, columns, displayColumns, changeData } = useDataGridData();
  if (loadingData) return <LoadingGrid />;
  if (!data || data.length < 1) return <EmptyGrid />;

  if (view === "line")
    return (
      <DataGridLineView
        columns={columns}
        data={search(data, searchValue)}
        initialDataLength={data.length}
        linkPage={viewLink}
        editLink={editLink}
        deleteAction={deleteAction}
      />
    );

  return <>grid view</>;
};

export default DataGridList;
