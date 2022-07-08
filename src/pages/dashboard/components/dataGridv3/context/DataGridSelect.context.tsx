import React, { createContext, useContext, useState, useMemo } from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

interface IDataGridSelect {
  selectedItems: string[];
  checkItem: (item: string) => void;
  checkAllItems: (items: string[]) => void;
  unCheckAllItems: () => void;
  unCheckItem: (item: string) => void;
}

const DataGridSelectContext = createContext<IDataGridSelect | null>(null);

export const useDataGridSelect = () => {
  const dataGridSelect = useContext(DataGridSelectContext);
  if (!dataGridSelect) {
    throw new Error("DataGridSelect is not available");
  }
  return dataGridSelect;
};

export const DataGridSelectProvider = ({ children }: IChildrenProps) => {
  const [selectedItems, setSelectItems] = useState<string[]>([]);

  const contextValue = useMemo(
    () => ({
      selectedItems: selectedItems,
      checkItem: (item: string) => setSelectItems([...selectedItems, item]),
      checkAllItems: (items: string[]) => setSelectItems(items),
      unCheckAllItems: () => setSelectItems([]),
      unCheckItem: (item: string) =>
        setSelectItems(
          selectedItems.filter((selectedItem) => selectedItem !== item)
        ),
    }),
    [selectedItems, setSelectItems]
  );

  return (
    <DataGridSelectContext.Provider value={contextValue}>
      {children}
    </DataGridSelectContext.Provider>
  );
};
