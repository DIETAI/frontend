import React from "react";

//dataGrid context
import { DataGridSearchProvider } from "../context/DataGridSearch.context";
import { DataGridViewProvider } from "../context/DataGridViewProvider";
import { DataGridSelectProvider } from "../context/DataGridSelect.context";

//styles
import * as Styled from "./DataGridContainer.styles";

//interfaces
import { IChildrenProps } from "interfaces/children.interfaces";

const DataGrid = ({ children }: IChildrenProps) => {
  return (
    <DataGridSearchProvider>
      <DataGridViewProvider>
        <DataGridSelectProvider>
          <Styled.DataGridWrapper>{children}</Styled.DataGridWrapper>
        </DataGridSelectProvider>
      </DataGridViewProvider>
    </DataGridSearchProvider>
  );
};

export default DataGrid;
