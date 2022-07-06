import React, { createContext, useContext, useState, useMemo } from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

interface IDataGridSearch {
  searchValue: string;
  handleSearchValue: (value: string) => void;
}

const DataGridSearchContext = createContext<IDataGridSearch | null>(null);

export const useDataGridSearch = () => {
  const dataGridSearch = useContext(DataGridSearchContext);
  if (!dataGridSearch) {
    throw new Error("DataGridSearch is not available");
  }
  return dataGridSearch;
};

export const DataGridSearchProvider = ({ children }: IChildrenProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const contextValue = useMemo(
    () => ({
      searchValue: searchValue,
      handleSearchValue: (value: string) => setSearchValue(value),
    }),
    [searchValue, setSearchValue]
  );

  return (
    <DataGridSearchContext.Provider value={contextValue}>
      {children}
    </DataGridSearchContext.Provider>
  );
};
