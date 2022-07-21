import React from "react";
import * as Styled from "./Alert.styles";

//icons
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

//interfaces
import { IAlertProps } from "./Alert.interfaces";

const Alert = ({ type, message }: IAlertProps) => {
  return (
    <Styled.AlertContainer
      type={type}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {type === "success" && (
        <>
          <FaCheckCircle color="lightgreen" size={30} />
          <Styled.AlertDescription>
            <h2>Sukces</h2>
            <p>{message}</p>
          </Styled.AlertDescription>
        </>
      )}
      {type === "error" && (
        <>
          <Styled.AlertDescription>
            <h2>Error</h2>
            <p>{message}</p>
          </Styled.AlertDescription>
          <FaExclamationCircle color="red" size={30} />
        </>
      )}
    </Styled.AlertContainer>
  );
};

export default Alert;
