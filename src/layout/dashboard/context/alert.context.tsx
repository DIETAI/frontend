import { IChildrenProps } from "interfaces/children.interfaces";
import React, { useContext, useState, useEffect, useMemo } from "react";

interface IAlert {
  alert: { display: boolean; type: string; message: string };
  handleAlert: (alertType: string, alertMessage: string) => void;
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

  const handleAlert = (alertType: string, alertMessage: string) => {
    setAlert({
      display: !alert.display,
      type: alertType,
      message: alertMessage,
    });
  };

  useEffect(() => {
    if (alert.display == true) {
      const timer = setTimeout(
        () => setAlert({ display: false, type: "", message: "" }),
        9000
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
