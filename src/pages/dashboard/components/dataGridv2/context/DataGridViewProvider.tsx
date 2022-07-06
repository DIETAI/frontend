import React, { createContext, useContext, useState, useMemo } from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

type View = "line" | "package";

interface IDataGridView {
  view: View;
  handleChangeView: (view: View) => void;
}

const DataGridViewContext = createContext<IDataGridView | null>(null);

export const useDataGridView = () => {
  const dataGridView = useContext(DataGridViewContext);
  if (!dataGridView) {
    throw new Error("DataGridView is not available");
  }
  return dataGridView;
};

export const DataGridViewProvider = ({ children }: IChildrenProps) => {
  const [view, setView] = useState<View>("line");

  const contextValue = useMemo(
    () => ({
      view: view,
      handleChangeView: (view: View) => setView(view),
    }),
    [view, setView]
  );

  return (
    <DataGridViewContext.Provider value={contextValue}>
      {children}
    </DataGridViewContext.Provider>
  );
};
