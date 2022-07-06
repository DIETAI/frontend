import React from "react";

//dataGrid context
import { DataGridSearchProvider } from "./context/DataGridSearch.context";
import { DataGridViewProvider } from "./context/DataGridViewProvider";

//components
import DataGridNav from "./nav/DataGridNav";
import DataGridList from "./list/DataGridList";

//styles
import * as Styled from "./DataGrid.styles";

//interfaces
import { IDataGridProps } from "./DataGrid.interfaces";

const DataGrid = ({
  addLink,
  exportAction,
  loadingData,
  data,
  link,
  columns,
}: IDataGridProps) => {
  return (
    <DataGridSearchProvider>
      <DataGridViewProvider>
        <Styled.DataGridWrapper>
          <DataGridNav addLink={addLink} exportAction={exportAction} />
          <DataGridList
            data={data}
            loadingData={loadingData}
            columns={columns}
            link={link}
          />
        </Styled.DataGridWrapper>
      </DataGridViewProvider>
    </DataGridSearchProvider>
  );
};

export default DataGrid;
