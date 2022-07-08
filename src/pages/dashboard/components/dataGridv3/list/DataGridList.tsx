import React from "react";
import { useDataGridSearch } from "../context/DataGridSearch.context";

//context
import { useDataGridView } from "../context/DataGridViewProvider";

//interfaces
import { IDataGridListProps } from "./DataGridList.interfaces";

//components
import DataGridLineView from "./lineView/DataGridLineView";

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
  link,
}: IDataGridListProps) => {
  const { view } = useDataGridView();
  const { searchValue } = useDataGridSearch();
  // const { data, columns, displayColumns, changeData } = useDataGridData();
  if (loadingData) return <div>loading data</div>;
  if (!data) return <div>empty data</div>;

  if (view === "line")
    return (
      <DataGridLineView
        columns={columns}
        data={search(data, searchValue)}
        linkPage={link}
      />
    );

  return <>grid view</>;
};

export default DataGridList;
