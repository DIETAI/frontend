import { IChildrenProps } from "interfaces/children.interfaces";
import React, { useContext, useState, useEffect, useMemo } from "react";

type IAlertType = "success" | "error" | "info";

interface IAlert {
  alert: { display: boolean; type: IAlertType; message: string };
  handleAlert: (alertType: IAlertType, alertMessage: string) => void;
}

const AlertContext = React.createContext<IAlert | null>(null);

export const useAlert = () => {
  const alert = useContext(AlertContext);
  if (!alert) {
    throw new Error("Alert is not available");
  }
  return alert;
};

export const AlertProvider = ({ children }: IChildrenProps) => {
  const [alert, setAlert] = useState<IAlert["alert"]>({
    display: false,
    type: "info",
    message: "Info alert",
  });

  const handleAlert = (alertType: IAlertType, alertMessage: string) => {
    setAlert({
      display: true,
      type: alertType,
      message: alertMessage,
    });
  };

  useEffect(() => {
    if (alert.display == true) {
      const timer = setTimeout(
        () => setAlert({ display: false, type: "info", message: "" }),
        2000
      );
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert.display]);

  return (
    <AlertContext.Provider
      value={{
        alert,
        handleAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
