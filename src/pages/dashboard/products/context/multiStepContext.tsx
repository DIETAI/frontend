import React, { createContext, useContext, useState, useMemo } from "react";
import { IChildrenProps } from "interfaces/children.interfaces";

interface IMultiStepContext {
  activeStepId: number;
  changeActiveStep: (id: number) => void;
}

const MultiStepContext = createContext<IMultiStepContext | null>(null);

export const useMultiStepForm = () => {
  const multiStepForm = useContext(MultiStepContext);
  if (!multiStepForm) {
    throw new Error("MultiStepForm context is not available");
  }
  return multiStepForm;
};

export const MultiStepFormProvider = ({ children }: IChildrenProps) => {
  const [activeStepId, setActiveStepId] =
    useState<IMultiStepContext["activeStepId"]>(1);

  const contextValue = useMemo(
    () => ({
      activeStepId: activeStepId,
      changeActiveStep: (id: number) => setActiveStepId(id),
    }),
    [activeStepId, setActiveStepId]
  );

  return (
    <MultiStepContext.Provider value={contextValue}>
      {children}
    </MultiStepContext.Provider>
  );
};
