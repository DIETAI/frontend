import React, { useState } from "react";

//components
import DataGridNav from "./nav/DataGridNav";
import DataGridList from "./list/DataGridList";
import LoadingGrid from "./loadingGrid/LoadingGrid";
// import ExportPopup from "./exportPopup/ExportPopup";

//styles
import * as Styled from "./DataGrid.styles";

//interfaces
import { IDataGridProps, IDataRow } from "./DataGrid.interfaces";

const DataGrid = ({
  availableColumns,
  dataRows,
  loading,
  linkPage,
  deleteAction,
}: IDataGridProps) => {
  if (loading) return <LoadingGrid />;

  //export data popup
  const [exportPopupDisplay, setExportPopupDisplay] = useState<boolean>(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(20);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataRows.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setCheckedRows([]);
  };

  //searching
  const [query, setQuery] = useState("");

  const search = (currentData: IDataGridProps["dataRows"]) => {
    const columns = currentData[0] && Object.keys(currentData[0]);

    const dataFilter = currentData.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );

    return dataFilter;
  };

  //checked
  const [checkedRows, setCheckedRows] = useState<IDataGridProps["dataRows"]>(
    []
  );

  const handleCheckedRows = (row?: IDataRow) => {
    //remove all rows checked
    if (!row && checkedRows.length === currentData.length) {
      return setCheckedRows([]);
    }

    //check all rows
    if (!row && checkedRows.length !== currentData.length) {
      return setCheckedRows(currentData);
    }

    //check one row
    if (!row) return;
    if (!checkedRows.includes(row)) {
      setCheckedRows([...checkedRows, row]);
    } else {
      setCheckedRows(checkedRows.filter((checkedRow) => checkedRow !== row));
    }
  };

  return (
    <Styled.DataGridWrapper>
      <DataGridNav
        query={query}
        setQuery={setQuery}
        data={dataRows}
        linkPage={linkPage}
        setExportPopupDisplay={setExportPopupDisplay}
      />
      <DataGridList
        availableColumns={availableColumns}
        dataRows={search(currentData)}
        checkedRows={checkedRows}
        handleCheckedRows={handleCheckedRows}
        loading={loading}
        linkPage={linkPage}
        deleteAction={deleteAction}
      />
      {/* {exportPopupDisplay && (
        <ExportPopup
          popupDisplay={exportPopupDisplay}
          setExportPopupDisplay={setExportPopupDisplay}
          availableColumns={availableColumns}
          dataRows={dataRows}
        />
      )} */}
    </Styled.DataGridWrapper>
  );
};

export default DataGrid;
