import { IChildrenProps } from "interfaces/children.interfaces";
import React, { createContext, useContext, FC, useState, useMemo } from "react";

type SelectedAssetId = string;

export interface IFileLibraryContext {
  selectedAssetId: SelectedAssetId;
  selectAssetId: (assetId: string) => void;
}

const FileLibraryContext = createContext<IFileLibraryContext | null>(null);

export const useFileLibrary = () => {
  const fileLibrary = useContext(FileLibraryContext);
  if (!fileLibrary) {
    throw new Error("File library context is not available");
  }
  return fileLibrary;
};

export const FileLibraryProvider = ({ children }: IChildrenProps) => {
  const [selectedAssetId, setSelectedAssetId] = useState<SelectedAssetId>("");

  const contextValue = useMemo(
    () => ({
      selectedAssetId,
      selectAssetId: (assetId: string) => setSelectedAssetId(assetId),
    }),
    [selectedAssetId, setSelectedAssetId]
  );

  return (
    <FileLibraryContext.Provider value={contextValue}>
      {children}
    </FileLibraryContext.Provider>
  );
};
